const firebaseConfig = {
      apiKey: "AIzaSyBIhHGy3LDJDNnpxGW7edALVSGLrrdziGA",
      authDomain: "kwitter-9dab3.firebaseapp.com",
      databaseURL: "https://kwitter-9dab3-default-rtdb.firebaseio.com",
      projectId: "kwitter-9dab3",
      storageBucket: "kwitter-9dab3.appspot.com",
      messagingSenderId: "204234288624",
      appId: "1:204234288624:web:24d8e5ad88f7484d890135",
      measurementId: "G-MRYWPWP56L"
};


firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("username");
document.getElementById("username").innerHTML = "Welcome " + username + "!";

function addRoom() {
      roomName = document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "adding room name"
      });
      localStorage.setItem("roomName", roomName);
      window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();
function redirectToRoomName(name){
  localStorage.setItem("roomName",name);
  window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("roomName");
      window.location = "index.html";
}
