import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_KoxxXfai2nCbEG8t5p9VaIG3b3MGqc0",
  authDomain: "course-plan-app-449905.firebaseapp.com",
  projectId: "course-plan-app-449905",
  storageBucket: "course-plan-app-449905.firebasestorage.app",
  messagingSenderId: "12313493017",
  appId: "1:12313493017:web:eff910274140e0ad4c7488"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
