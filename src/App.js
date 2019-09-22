import React from 'react';
import axios from 'axios';
import Table from './Table';
import ModalWindow from './ModalWindow';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {data : [], userName : '', age : '', id : '', renderCancelBtn : false, error:'', openModal : false, closeModal : true};
  }
  ModalActions = () => {
    this.setState({openModal:true});
    this.setState({closeModal:false});
  }
  onCloseModal = () => {
    this.setState({openModal:false});
    this.setState({closeModal:true});
  }
  validation = () => {
    if(this.state.age.trim().length === 0 || this.state.userName.trim().length === 0){
      this.setState({error:'Enter all the fields'});
      this.ModalActions();
      return false;
    }
    else if(!(/^[a-zA-Z]*$/.test(this.state.userName))){
      this.setState({error:'Enter Valid Name.. only alphabets'});
      this.ModalActions();
      return false;
    }
    else if(!(/^[0-9]*$/.test(this.state.age))){
      this.setState({error:'Enter only numeric for age'});
      this.ModalActions();
      return false;
    }
    else {
      return true;
    }
  }
  clearState = () => {
    this.userName.value = '';
    this.age.value = '';
    this.setState({userName:''});
    this.setState({age:''});
  }
  getData = () => {
      axios.get('http://localhost:8500/Practice/CRUD/crud.cfc?method=userList',{
      }).then(response => {
        this.clearState();
        this.setState({data: response.data.DATA});
        this.setState({renderCancelBtn: false})
      });
  }
  deleteUser = (id) => {
    axios.get('http://localhost:8500/Practice/CRUD/crud.cfc?method=deleteUser',{
        params:{'id' : id}
    }).then(response => {
      this.getData();
    });
  }
  componentWillMount(){
    this.getData();
  }
  onAddUser = () => {
    if(this.validation()){
      axios.get('http://localhost:8500/Practice/CRUD/crud.cfc?method=addUser',{
        params:{'userName' : this.state.userName, 'age': this.state.age}
      }).then(response => {
        this.getData();
      });
    }
  }
  updateTrigger = (id,user,age) => {
    this.userName.value = user;
    this.age.value = age;
    this.setState({id: id, userName: user, age: age});
    this.setState({renderCancelBtn: true});
  }
  updateUser = () => {
    this.validation();
    if(this.validation()){
      axios.get('http://localhost:8500/Practice/CRUD/crud.cfc?method=updateUser',{
        params:{'userName' : this.state.userName, 'age': this.state.age, 'id': this.state.id}
      }).then(response => {
        this.getData();
      });
    }
  }
  cancel = () =>{
    this.setState({renderCancelBtn: false});
    this.clearState();
  }
  renderBtn(){
    if(!this.state.renderCancelBtn){
      return <button type="button" ref={button => this.button = button} className="btn btn-primary float-right" onClick={this.onAddUser} id="submit">Add</button>
    } else {
      return(
        <span>
          <button type="button" onClick={this.updateUser} className="btn btn-success float-right">update</button>
          <button type="button" onClick={this.cancel} className="btn btn-default float-right">cancel</button>
        </span>
      );
    }
  }
  render(){
    return(
      <div className="container">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-6">
            <h3>Add user</h3>
            <div className="card">
              <div className="card-body">
                <div className="form-group">
                  <label>UserName:</label>
                  <input type="text" ref={userName => this.userName = userName} onChange={(e)=>this.setState({userName:e.target.value})} className="form-control" id="userName" name="userName"/>
                </div>
                <div className="form-group">
                  <label>age:</label>
                  <input type="text" ref={age => this.age = age} onChange={(e)=>this.setState({age:e.target.value})} className="form-control" id="pass" name="password"/>
                </div>
              </div>
              {this.renderBtn()}
            </div>
            <Table details={this.state.data} delete={this.deleteUser} update={this.updateTrigger}/>
            <ModalWindow ModalOpen={this.state.openModal} ModalClose={this.onCloseModal} error={this.state.error}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
