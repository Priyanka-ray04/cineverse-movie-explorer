const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    const user = {
      username,
      email,
      password,
    };

    // getting old users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // checking if email already exists
    const existingUser = users.find(function (item) {
      return item.email === email;
    });

    if (existingUser) {
      alert("User already exists");

      return;
    }

    // adding new user
    users.push(user);

    // saving to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully");

    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();

    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(function (user) {
      return user.email === email && user.password === password;
    });

    if (!validUser) {
      alert("Invalid email or password");

      return;
    }

    // save logged in user
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));

    alert("Login successful");

    window.location.href = "index.html";
  });
}
