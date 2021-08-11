function save_user() {
    user_name = document.getElementById("user_name").value;
    localStorage.setItem("User", user_name);
    window.location = "letschatroom.html";
}