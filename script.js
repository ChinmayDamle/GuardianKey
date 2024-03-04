//hamburger
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

//Save passwords in localstorage

document.querySelector(".btn-save").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Clicked");
  console.log(username.value, password.value);
  let passwords = localStorage.getItem("passwords");
  console.log(passwords);

  if (passwords == null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPassword();
  showPopup("Password saved successfully!")

  
});

//Pop-up
function showPopup(message) {
  var popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(function () {
    popup.classList.remove("show");
  }, 1300); // Hide popup after 2 seconds
}
// Hide popup after 2 seconds

//Fill table

const showPassword = () => {
  let passtable = document.querySelector(".password-table");
  let data = localStorage.getItem("passwords");

  if (data == null || JSON.parse(data).length == 0) {
    passtable.innerHTML =
      "<tr><td colspan='4'>Protect Your Digital Footprints Now!</td></tr>";
  } else {
    let array = JSON.parse(data);
    let str = "";
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      str += `<tr>
      <td>${element.website}</td>
      <td>${element.username} <img onclick="copy('${
        element.username
      }')" src='./assets/copy-icon.svg' alt="copy button"></td>
      <td>${mask(element.password)} <img onclick="copy('${
        element.password
      }')" src='./assets/copy-icon.svg' alt="copy button"></td>
      <td><button class="delete-btn" onclick="deletePassword('${
        element.website
      }')">Delete</button></td>
      </tr>`;
    }
    passtable.innerHTML =
      "<tr><th>Website Name</th><th>Username</th><th>Password</th><th>Delete</th></tr>" +
      str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};

console.log("working");
showPassword();

// delete password
const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let array = JSON.parse(data);
  arrayUpdaed = array.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrayUpdaed));
  
  showPassword();
  showPopup("Password deleted successfully!")
};

// Copy
function copy(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      // document.querySelector(".alert")
    },
    () => {
      console.log("copy failed");
    }
  );
  showPopup("Copied to clipboard!")
}

//Mask password
function mask(pass) {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
}
