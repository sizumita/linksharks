import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBdMMWSRR9-z387qaMq-9umxd-JAnsRVW0',
  authDomain: 'linksharks-dev.firebaseapp.com',
  databaseURL: 'https://linksharks-dev.firebaseio.com',
  projectId: 'linksharks-dev',
  storageBucket: 'linksharks-dev.appspot.com',
  messagingSenderId: '768556492292',
  appId: '1:768556492292:web:c5c60106c8bd71099db751',
  measurementId: 'G-2VM1G0QKPE',
}

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

export default firebase
