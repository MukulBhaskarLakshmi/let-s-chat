//ADD YOUR FIREBASE LINKS HERE
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBh0ZYMJeHim3yMl-Y3koPBfh5D7a_uMZU",
    authDomain: "kwitter-5fc38.firebaseapp.com",
    databaseURL: "https://kwitter-5fc38.firebaseio.com",
    projectId: "kwitter-5fc38",
    storageBucket: "kwitter-5fc38.appspot.com",
    messagingSenderId: "626435043631",
    appId: "1:626435043631:web:ec6ab251a6cbbb187231da"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user = localStorage.getItem("User");

document.getElementById("welcome_user").innerHTML = "Welcome " + user + " !";

function add_room() {
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "letschat_page.html";
}

function getData() {
    firebase.database().ref("/").on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log("Room names" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick = 'redirectToroomname(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            //End code
        });
    });
}
getData();

function redirectToroomname(name) {
    console.log("name");
    localStorage.setItem("Room_name", name);
    window.location = "letschat_page.html";
}

function log_out() {
    localStorage.removeItem("User");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}