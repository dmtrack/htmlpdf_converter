import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'htmlpdf-converter.firebaseapp.com',
    projectId: 'htmlpdf-converter',
    storageBucket: 'htmlpdf-converter.appspot.com',
    messagingSenderId: '554352894236',
    appId: '1:554352894236:web:1e2c87b05d42fb95bf5ad9',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
