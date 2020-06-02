import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCagN7rE_OMyDII0F10tT5LOElb3FadfPc",
    authDomain: "catch-of-the-day-jason-2.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-jason-2.firebaseio.com"   
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;