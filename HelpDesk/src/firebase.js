import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB1fX5yiZE1p8jl96PXimiJWCOZ9aLUQFs",
    authDomain: "helpdesk-b212f.firebaseapp.com",
    projectId: "helpdesk-b212f",
    storageBucket: "helpdesk-b212f.appspot.com",
    messagingSenderId: "22845586167",
    appId: "1:22845586167:web:499450b7c4bd886c99f1f2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
