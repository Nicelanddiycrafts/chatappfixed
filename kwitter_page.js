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
roomName = localStorage.getItem("roomName");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(roomName).push({
            name: username,
            message: msg,
            like: 0
      });
}
function getData() {
      firebase.database().ref("/" + roomName).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        name1 = message_data["name"];
                        message = message_data["message"];
                        like = message_data["like"];
                        name_with_tag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button +span_with_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function updateLike(firebase_message_id){
   buttonId = firebase_message_id;
   likes = document.getElementById(buttonId).value;
   updated_likes = Number(likes) + 1;
   firebase.database().ref(roomName).child(firebase_message_id).update({
         like: updated_likes
   });
}

function logout() {
      localStorage.removeItem("username");
      localStorage.removeItem("roomName");
      window.location = "index.html";
}

