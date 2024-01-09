import firebase from 'firebase';

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

const firebaseApp = firebase.initializeApp(firebaseConfig);
var database = firebaseApp.database();

export { database, firebaseApp };
