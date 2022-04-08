import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDdioenU7O_A7OJH2zm0G-vuDIyS5Wgc7c',
  authDomain: 'diabilink-1621065125429.firebaseapp.com',
  databaseURL:
    'https://diabilink-1621065125429-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'diabilink-1621065125429',
  storageBucket: 'diabilink-1621065125429.appspot.com',
  messagingSenderId: '14056139189',
  appId: '1:14056139189:web:73eeca1afaa2a0d3cb51fc',
  measurementId: 'G-GPVEFLKXLF',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
