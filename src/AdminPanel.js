import { json } from "react-router-dom";

var variable4 = localStorage.getItem("adminKey");

console.log(variable4);

const promoteUser=(e) => {
  e.preventDefault();
  let data = {
    user_email: document.getElementById("admin_panel_user_email").value,
  };
  //MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
  var request = new Request('http://localhost:3000/api/promoteUser', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: JSON.stringify(data)
  });
  
  fetch(request)
    .then(function(response){
      response.json()
        .then(function(data) {
          console.log(data);
        })
    })
    .catch(function(err) {
      console.log(err)
    })
    document.getElementById('responseMessage').innerHTML = 'User promoted. Refresh to see changes.';
  }

const deleteUser=(e) => {
  e.preventDefault();
  let data = {
    user_email: document.getElementById("admin_panel_user_email").value,
  };
  //MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
  var request = new Request('http://localhost:3000/api/deleteUser', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: JSON.stringify(data)
  });
  
  fetch(request)
    .then(function(response){
      response.json()
        .then(function(data) {
          console.log(data);
        })
    })
    .catch(function(err) {
      console.log(err)
    })
    document.getElementById('responseMessage').innerHTML = 'User deleted. Refresh to see changes.';
  }

const pullUsers=(e) => {
  e.preventDefault();
  let data = {
  };
  //MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
  var request = new Request('http://localhost:3000/api/pullUsers', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: JSON.stringify(data)
  });
  
  fetch(request)
    .then(function(response){
      response.json()
        .then(function(data) {
          for (var i = 0; i < data.length; i++){
            document.getElementById('superTest').innerHTML += ("<br><br><h2>User #: " + i + "</h2>");
            var obj = data[i];
            for (var key in obj){
              var value = obj[key];
              document.getElementById('superTest').innerHTML += ("<br/><br/> - " + key + ": "+ value + "<br/><br/>");
            }
          }
        })
    })
    .catch(function(err) {
      console.log(err)
    })
  }

const AdminPanel = () => {
  if (variable4 == 'User') {
    return <div class="container">
      <br/>
      <br/>
      <br/>
      <br/>
    <h2>You do not have access to this page.</h2>
     </div>;
  } else if (variable4 == 'Admin') {
    return <div class="container">
      <br/>
      <br/>
      <br/>
      <br/>
    <h2>Welcome to the admin panel!</h2>
    <br/>
    <br/>
    <p>Here you can view, delete, and change the role of all users in the Database!
      <br/><br/>
      Click the <strong>"Get Users"</strong> button to pull a list. Then, type a users email into the text box and click either <strong>Delete</strong> or <strong>Give Admin Role</strong>.</p>
      <br/>
      <br/>
      <button onClick={pullUsers} class="btn btn-dark">Pull Users</button>
      <br/>
      <br/>
      <div id="superTest"></div>
      <br/>
      <div id="postSuperTest">
      <form id="changeUserForm">
        <input type="email" class="form-control" id="admin_panel_user_email" aria-describedby="emailHelp" placeholder="Enter Email"/>
        <br/>
        <h2 id="nameChangeMessage"></h2>
        <button onClick={deleteUser} class="btn btn-dark">Delete User</button> <button onClick={promoteUser} class="btn btn-dark">Give Admin Role</button>
        <h2 id="responseMessage"></h2>
        </form>
         {/* ADD A BUNCH OF BREAKS INSTEAD OF MESSING WITH THE MARGINS FOR NOW */}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>
     </div>;
  } else if (variable4 == null) {
    return <div class="container">
      <br/>
      <br/>
      <br/>
      <br/>
    <h2>You need to login first.</h2>
     </div>
  }
  };
  
  export default AdminPanel;

