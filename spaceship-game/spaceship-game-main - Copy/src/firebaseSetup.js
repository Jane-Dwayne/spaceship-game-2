// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBYpXYRyIRdN8o0GyfVewSdUM2P3Q-tUb4",
  authDomain: "onlinetesting-42b6b.firebaseapp.com",
  databaseURL: "https://onlinetesting-42b6b-default-rtdb.firebaseio.com",
  //databaseURL: "onlinetesting-42b6b.appspot.com",
  projectId: "onlinetesting-42b6b",
  storageBucket: "onlinetesting-42b6b.appspot.com",
  messagingSenderId: "303642679764",
  appId: "1:303642679764:web:9ea15e68cbd228618dde41",
  measurementId: "G-V4TG46RRYG"
};


// Initialize Firebase with the config object
const app = initializeApp(firebaseConfig);

// Initialize the Realtime Database
const db = getDatabase(app);

// This variable will hold the unique identifier for the current user/session
let uid;

// Get the form and input field elements
const signInButton = document.getElementById("signInButton");
const userIdInput = document.getElementById("userId");

signInButton.addEventListener("click", () => {
  const userId = userIdInput.value.trim();

  if (!/^\d{3,4}$/.test(userId)) {
    // Display an error toast using Toastify
    Toastify({
        text: 'User ID must be a 3 to 4 digit number.',
        duration: 3000, // Display duration in milliseconds (e.g., 3000 ms = 3 seconds)
        close: true, // Show a close button
        gravity: 'top', // Display the toast at the top
        position: 'center', // Position of the toast (centered)
        backgroundColor: 'red', // Background color of the toast
        textColor: 'white',
        style: {
            textAlign: 'center', // Center text horizontally
            justifyContent: 'center', // Center text vertically
        },
    }).showToast();
    return;
}
  if (userId !== "") {
    // Store user ID in the Realtime Database
    const userRef = ref(db, `users/${userId}`);
    set(userRef, true) // You can set any value here; true is used as a placeholder
      .then(() => {
        Toastify({
          text: 'Login successful',
          duration: 3000,
          close: true,
          gravity: 'top',
          position: 'center',
          backgroundColor: 'green',
          textColor: 'white',
          style: {
              textAlign: 'center', // Center text horizontally
              justifyContent: 'center', // Center text vertically
          },
      }).showToast();
      document.getElementById("startButton").removeAttribute("disabled");
        console.log("User ID saved to the database.");
        uid = userId; // Set uid to the user ID
      
      })
      .catch((error) => {
        console.error("Error storing user ID:", error);
      });
  } else {
    alert("Please enter a valid User ID.");
  }
});

//const docRef = doc(db, 'onlinetesting-42b6b', game.studyID, 'userId', uid);
// setDoc(docRef, {
//    subjectID: game.subjectID,
//    date: new Date().toLocaleDateString(),
//    time: new Date().toLocaleTimeString(),
//    trial_data: [],
//    attention_checks: []
// });

// Export the uid and db variables
export { uid, db };
