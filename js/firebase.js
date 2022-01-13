// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js';
import {
  getDatabase,
  set,
  ref,
  push,
  child,
  update,
} from 'https://www.gstatic.com/firebasejs/9.6.2/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { firebaseConfig } from './firebase_config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Reference messages collection
var database = getDatabase(app);

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, message);

  // Show alert
  //document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  //setTimeout(function () {
  //  document.querySelector('.alert').style.display = 'none';
  //}, 3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message) {
  const postData = {
    name: name,
    message: message,
    email: email,
  };
  const newPostKey = push(child(ref(database), ' messages')).key;

  const updates = {};
  // Write the new post's data simultaneously in the posts list and the user's post list.
  updates['/messages/' + newPostKey] = postData;

  update(ref(database), updates);
}
