//YOUR FIREBASE LINKS
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
room = localStorage.getItem("room_name");

function Send() {
    msg = document.getElementById("msg").value;
    firebase.database().ref(room).push({
        name: user,
        message: msg,
        like: 0
    });
}

function getData() {
    firebase.database().ref("/" + room).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = " ";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                Name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + " </h4>";
                like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelike(this.id)'> ";
                span_with_tag = "<span class'glyphicon glyphicon-thumbs-up'>Like:  " + like + "</span></button><hr>";
                row = Name_with_tag + message_with_tag + like_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
                //End code

            }
        });
    });
}
getData();

function updatelike(message_id) {
    console.log(message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    firebase.database().ref(room).child(message_id).update({
        like: updated_likes
    });
}

function logout() {
    localStorage.removeItem("User");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}