
function login() {

    let email = document.getElementById("admin-email").value;
    let password = document.getElementById("admin-password").value;

    if (email == "") {
        alert("Please enter your email");
        return false;
    }

    else if (password == "") {
        alert("Please enter your password");
        return false;
    }

    else if (password.length < 6) {
        alert("Password must contain at least 6 characters");
        return false;
    }

    else {
        alert("Login Successful");
        return true;
    }

}
