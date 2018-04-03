import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import {  Link } from 'react-router-dom';

export default class Update extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      userName:'',
      message:'',
      err:false   
    }
  }
  
  componentWillMount(){
    const { match: { params } } = this.props;
    console.log(params)
      const self=this;
      axios.get('http://localhost:9000/player/'+params.id)
    .then(function (response) {
      console.log(response.data);
      self.setState({
        userName:response.data.name
        
      })
    })
    .catch(function (error) {
       self.setState({ 
        err:"Somthing went wrong",
      })
    });
  }

  updatePlayer(username){
    const { match: { params } } = this.props;
      const self=this;
      console.log(JSON.stringify({name:username}))
      axios.put('http://localhost:9000/player/'+params.id, {name:username}) 

    .then(function (response) {
      
      self.setState({
        userName:response.data.name,
        message:"Player Update Successfully!",
      })
    })
    .catch(function (error) {
      self.setState({ 
        err:"Somthing went wrong",
      }) 
    });
  }

  

  render() {
    return (
     <div className="container">
        <div className="row">
            <div className='col-sm-10 row'>
              { this.state.message &&
                <div className='alert alert-success'>
                  <span className='glyphicon  glyphicon-success-sign'>
                  {this.state.message}
                  </span> 
                </div>
              }
              { this.state.err &&
                <div className='alert alert-danger'>
                  <span className='glyphicon  glyphicon-warning-sign'>
                  {this.state.err}
                  </span> 
                </div>
              }
            </div>
            <div className='col-sm-2 pull-right row'>
              <Link to={'/'}><button className='btn btn-info pull-right'> Back </button> </Link>      
            </div>
            
            </div>
          <div className="row">      
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <span className="glyphicon glyphicon-user"></span>Update Player
                  <div className="pull-right action-buttons">
                    <div className="btn-group pull-right">
                      Action
                    </div>
                  </div>
                </div>
                <div className="panel-body update-data">
                  <input type="text" value={this.state.userName} onChange={(text)=>this.setState({userName:text.target.value})}/>              
                  <button className='btn btn-info' onClick={ () => this.updatePlayer(this.state.userName)}>Update</button>
                </div>
                
            </div>
          </div>
      
    </div>
    );
  }
}
