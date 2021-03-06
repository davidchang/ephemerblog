import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'gestalt/dist/gestalt.css';

firebase.initializeApp({
  apiKey: 'AIzaSyBfr0ucW3rp153r0x0-rdb1vCvSNtYnp4k',
  authDomain: 'ephemerblog.firebaseapp.com',
  databaseURL: 'https://ephemerblog.firebaseio.com',
  projectId: 'ephemerblog',
  storageBucket: 'ephemerblog.appspot.com',
  messagingSenderId: '329151945243',
});

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
