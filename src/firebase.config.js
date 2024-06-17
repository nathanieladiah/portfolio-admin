import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAoWt2Il3lYQ_xHIT-9MhOQfiaGTbNJFok',
  authDomain: 'portfolio-28012.firebaseapp.com',
  projectId: 'portfolio-28012',
  storageBucket: 'portfolio-28012.appspot.com',
  messagingSenderId: '622313582409',
  appId: '1:622313582409:web:5ac04dc80b18b045c77498',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
