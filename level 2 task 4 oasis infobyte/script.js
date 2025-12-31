// Get users from localStorage or create empty array
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Register new user
function register() {
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (user === "" || pass === "") {
    alert("Please fill all fields");
    return;
  }

  let users = getUsers();

  // Check if user already exists
  let userExists = users.some(u => u.username === user);
  if (userExists) {
    alert("User already exists");
    return;
  }

  users.push({ username: user, password: pass });
  saveUsers(users);

  alert("Registration successful! Please login.");
  window.location.href = "index.html";
}

// Login user
function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  let users = getUsers();

  let validUser = users.find(
    u => u.username === user && u.password === pass
  );

  if (validUser) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", user);
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid username or password");
  }
}

// Check secured page
function checkLogin() {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Clear login fields
function clearLoginFields() {
  document.getElementById("loginUser").value = "";
  document.getElementById("loginPass").value = "";
}
