import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBfr0ucW3rp153r0x0-rdb1vCvSNtYnp4k',
  authDomain: 'ephemerblog.firebaseapp.com',
  databaseURL: 'https://ephemerblog.firebaseio.com',
  projectId: 'ephemerblog',
  storageBucket: 'ephemerblog.appspot.com',
  messagingSenderId: '329151945243',
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
