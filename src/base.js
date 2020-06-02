import Rebase from 're-base';
import firebase from 'firebase';



const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;