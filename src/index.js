import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFKydsAEvrOfIyAOyvopHuSGAYhLOgwpc",
  authDomain: "planificare-intrunire-teren.firebaseapp.com",
  databaseURL: "https://planificare-intrunire-teren-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "planificare-intrunire-teren",
  storageBucket: "planificare-intrunire-teren.appspot.com",
  messagingSenderId: "294447462755",
  appId: "1:294447462755:web:f67ce25a3c8926f6ef7b56",
  measurementId: "G-RL5HMWBKVT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
