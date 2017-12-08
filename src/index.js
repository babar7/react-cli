import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todo from './CustomeComponent/ToDo.js'
import App from './App';
import firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

var config = {
    apiKey: "AIzaSyB_Szq4ZI2INJpEZ2XGB7ucJw_O858a2Ws",
    authDomain: "todoappusingreact.firebaseapp.com",
    databaseURL: "https://todoappusingreact.firebaseio.com",
    projectId: "todoappusingreact",
    storageBucket: "todoappusingreact.appspot.com",
    messagingSenderId: "149810336387"
  };
  firebase.initializeApp(config);

ReactDOM.render(
    React.createElement('div', null, <App />, <Todo />), 
    document.getElementById('root'));
registerServiceWorker();
