function password(){
    text = document.getElementById("password").value;
    pass = "avalara";
    if (text == pass){
        window.location = "kwitter_room.html";
    }else{
        window.location = "index.html";
    }
}