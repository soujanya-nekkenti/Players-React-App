import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default class AddPlayer extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      targateId:'',
      targateName:'',
      userName:'',
      message:'',
      err:false,
      userList:[]
    }
  }

  componentWillMount() {
      const self=this;
      axios.get('http://localhost:9000/players')
    .then(function (response) {
      console.log(response.data);
      self.setState({
        userList:response.data
      })
    })
    .catch(function (error) {
     self.setState({ 
        err:"Somthing went wrong",
      })
    });
  }

  setForAction(data){
    this.setState({
      targateId : data.id,
      targateName : data.name
    })
  }

  newUser(data){
   const self=this;
      axios.post('http://localhost:9000/player', {name:data})
    .then(function (response) {
      let { userList } = self.state
      self.setState({
        userList,
        userName:'',
        message:"Player successfully added!", 
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
                <span className="glyphicon glyphicon-user"></span>Add Player
                <div className="pull-right action-buttons">
                  <div className="btn-group pull-right"> Action </div>
                </div>
              </div>

              <div className="panel-body">
                <ul className="list-group">
                  <input type="text" value={this.state.userName} onChange={(text)=>this.setState({userName:text.target.value})}/>              
                  <button className='btn btn-info' onClick={() => this.newUser(this.state.userName)}> Add </button>      
                </ul>
              </div>
        
            </div>
        </div>
      
    </div>
    );
  }
}