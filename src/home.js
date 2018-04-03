import React, { Component } from 'react';
import './App.css';
import {Link } from 'react-router-dom';
import axios from 'axios'

export default class Home extends Component {
   constructor(props) {
      super(props);
    
    this.state={
      targate:{},
      total:'',
      index:'',
      userList:[]
    }
  }
      
componentWillMount(){
  const self=this;
  axios.get('http://localhost:9000/players')
  .then(function (response) {
    console.log(response.data);
    self.setState({
      userList:response.data,
      index:0
    })
  })
  .catch(function (error) {
    self.setState({ 
        err:"Somthing went wrong",
      })
  });
}


  deletePlayer(data){
    const self=this;
      axios.delete('http://localhost:9000/player/'+data)
    .then(function (response) {
      let { userList } = self.state
      let index = userList.findIndex(user => user.id === data.id)
      userList.splice(index,1)
      self.setState({
        userList
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
          <div className='col-sm-2 pull-right row'>        
            <Link to={'/AddPlayer'}> 
              <button className='btn btn-info pull-right'> Add Player </button> 
            </Link>      
          </div>
        </div>

        <div className="row">      
            <div className="panel panel-primary">

              <div className="panel-heading">
                <span className="glyphicon glyphicon-user"></span>Name
                <div className="pull-right action-buttons">
                  <div className="btn-group pull-right"> Action </div>
                </div>
              </div>
                
              <div className="panel-body">
                <ul className="list-group">
                    {  
                      this.state.userList.map((recipe,index) => {
                        console.log(recipe);                
                        return ( 
                          <li className="list-group-item" key={recipe.id} id="#deleteData" >
                            <label>{index+1}</label>
                            {recipe.name}

                            <div className="pull-right action-buttons">
                              <Link to={"/Update/"+recipe.id}> <span className="glyphicon glyphicon-pencil"></span> </Link>
                              <a className="makePointer" onClick={() => this.setState({targate:recipe})}>
                                <span data-toggle="modal" data-target="#myModal" className="glyphicon glyphicon-trash trash"> </span>
                              </a>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>

                <div className="panel-footer">
                  <div className="row">
                    <div className="col-sm-12 text-right">
                        <h5>Total Count {this.state.userList.length}</h5>
                    </div>
                  </div>
                </div>

            </div>
          </div>

      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="edit" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close btn_close" data-dismiss="modal" aria-hidden="true">
                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
              </button>
              <h4 className="modal-title custom_align" id="Heading">Delete Player</h4>
            </div>

            <div className="modal-body">
              <div className="alert alert-danger">
                <span className="glyphicon glyphicon-warning-sign"></span> Are you sure you want to delete player <b> {this.state.targate.name}</b> ?
              </div>
            </div>

            <div className="modal-footer "> 
              <button type="button" className="btn btn-success" onClick = {() => this.deletePlayer(this.state.targate.id)} data-dismiss="modal">
                <span className="glyphicon glyphicon-ok-sign"></span> Yes </button>
              <button type="button" className="btn btn-default btn_close" data-dismiss="modal">
                <span className="glyphicon glyphicon-remove"></span> No </button>
            </div>

          </div>
        </div>
      </div>
    </div>
    );
  }
}