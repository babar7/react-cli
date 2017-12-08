import React, { Component } from 'react';
import './todo.css'
import * as firebase from 'firebase'


 
class Todo extends Component{ 
    constructor(){
        super()
        this.state = {
            todoList: [],
            flag: true,
            todoID : '',
            todoVal: '',
            todoIndex : '',
            alert : "none",
            inputTodoVal : ''
        }
        let data = [];
        
        firebase.database().ref('/').child("todoList").on("value", snap => {
        data = []
        snap.forEach(val => {
        let obj = val.val();
        obj.id = val.key;
        data.push(obj)
        this.setState({todoList : data});
        })
        })
        
    }

    gettingTodo(e){
        this.setState({inputTodoVal : e.target.value, alert : "none"})

    }
    addTodo(){
        if(this.state.inputTodoVal !== ""){
            let todoList = {todo : this.state.inputTodoVal};
            this.setState({ alert : "none", inputTodoVal : ''});
            this.state.todoList.push(todoList);
            firebase.database().ref('/').child("todoList").push(todoList);
        }
        else {
            this.setState({ alert : "block"});
        }
    } 

    removeTodo(){
        if(this.state.todoList.length === 1){

        firebase.database().ref('/').child(`todoList/${this.state.todoID}`).remove();
        this.setState({todoList : []});
    }
    else{
        firebase.database().ref('/').child(`todoList/${this.state.todoID}`).remove();
        
    }
        
    }

    modalPopup(key, value , index) {
        
        this.setState({todoID : key, todoVal: value, todoIndex : index });
       
    }
    updatedValue(e){
        this.setState({todoVal : e.target.value});

    }
    saveChanges(){
        firebase.database().ref('/').child(`todoList/${this.state.todoID}`).update({todo : this.state.todoVal})
    }
        
        
    render(){
       
        return (
            <div>
                <h1 className="heading"> Todo List </h1>
                <hr />
                <hr />
            <div className="input-group">
                <input type="text" className="form-control col-8 todo-input" value={this.state.inputTodoVal} onChange={this.gettingTodo.bind(this)} placeholder="Enter Your Todo Here"/>
                <button className="btn btn-primary addTodo" onClick={this.addTodo.bind(this)}> Add Todo </button>
            </div>
            
            <div className="alert alert-danger alert" role="alert" style = {{display : this.state.alert}}>
                Please Enter Some Value !
            </div>
            <div>
            <ul className="list-group ul"> 
            {this.state.todoList.map((value, index)  => {
                return <li key={index} className="list-group-item list-group-item-action list-group-item-secondary li"  
                        data-toggle="modal" data-target="#exampleModal" onClick={this.modalPopup.bind(this, value.id, value.todo, index)}> {value.todo}
                        </li>
            })}            
            </ul> 
            </div>      

              
            <div>   
                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Want to edit or remove ?</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div className="modal-body">
                
                <input type="text" className="form-control" value={this.state.todoVal} onChange={this.updatedValue.bind(this)}/>

                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.removeTodo.bind(this)}>Remove</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveChanges.bind(this)}>Save changes</button>
                </div>
                </div>
                </div>
                </div>    
            </div>       
            
            
        </div>           
          )
        }

}


export default  Todo;