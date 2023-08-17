"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: 'htmlpdf-converter.firebaseapp.com',
    projectId: 'htmlpdf-converter',
    storageBucket: 'htmlpdf-converter.appspot.com',
    messagingSenderId: '554352894236',
    appId: '1:554352894236:web:1e2c87b05d42fb95bf5ad9',
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const storage = (0, storage_1.getStorage)(app);
exports.default = storage;
