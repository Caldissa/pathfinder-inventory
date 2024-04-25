import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyB5ts9fRzt9afJzTYLo66xrpHI6Y7i5yoI',
    authDomain: 'pathfinder-inventory.firebaseapp.com',
    projectId: 'pathfinder-inventory',
    storageBucket: 'pathfinder-inventory.appspot.com',
    messagingSenderId: '962715164223',
    appId: '1:962715164223:web:628bf7e3ed685bb77c228a',
    measurementId: 'G-R9VEXK6S8Y'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth()

export { db, auth }
