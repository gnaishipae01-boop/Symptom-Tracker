
import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCiDwbU0Dbtlzh2J8Y-bDk4in5xVK3wS2U",
    authDomain: "assignment-d3fbe.firebaseapp.com",
    projectId: "assignment-d3fbe",
    storageBucket: "assignment-d3fbe.firebasestorage.app",
    messagingSenderId: "877774597120",
    appId: "1:877774597120:web:0a8d8f7609454b100dbce5",
    measurementId: "G-XE30WL3CYZ"
};

const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

const db = getFirestore(app);

export { app, db };