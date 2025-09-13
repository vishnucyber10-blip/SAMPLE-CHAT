// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let roomCode = "";

function joinRoom() {
  roomCode = document.getElementById('codeInput').value.trim();
  if (roomCode) {
    document.getElementById('join').style.display = 'none';
    document.getElementById('chat').style.display = 'block';

    db.ref(roomCode).on('child_added', snapshot => {
      const msg = snapshot.val();
      const div = document.createElement('div');
      div.textContent = msg;
      document.getElementById('messages').appendChild(div);
    });
  }
}

function sendMessage() {
  const msg = document.getElementById('messageInput').value.trim();
  if (msg) {
    db.ref(roomCode).push(msg);
    document.getElementById('messageInput').value = '';
  }
}