var variable1 = localStorage.getItem("emailKey");
var variable2 = localStorage.getItem("passwordKey");
var variable3 = 'You need to login first.';

console.log(variable1, variable2);

const tryAdminPanel=(e) => {
    e.preventDefault();
let data = {
  user_name: document.getElementById('displayName').innerHTML
};
//MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
var request = new Request('http://localhost:3000/api/try-admin-panel', {
method: 'POST',
headers: new Headers({ 'Content-Type': 'application/json' }),
body: JSON.stringify(data)
});

fetch(request)
  .then(function(response){
    response.json()
      .then(function(data) {
        console.log(Object.values(data[0]))
        if (Object.values(data[0]) == 'User') {
            document.getElementById('adminPanelMessage').innerHTML = `Sorry, you don't have access to the Admin panel!`;
        } else if (Object.values(data[0]) == 'Admin') {
            localStorage.setItem("adminKey", Object.values(data[0]));
            window.location.replace('/AdminPanel');
        }
      })
  })
  .catch(function(err) {
    console.log(err)
  })

  document.getElementById("nameChangeMessage").innerHTML = 'Redirecting..';
}

const changeUserName=(e) => {
    e.preventDefault();
let data = {
  user_email: document.getElementById("user_alter_email").value,
  user_password: document.getElementById("user_alter_password").value,
  user_newname: document.getElementById("user_alter_newname").value
};
//MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
var request = new Request('http://localhost:3000/api/alter-user', {
method: 'POST',
headers: new Headers({ 'Content-Type': 'application/json' }),
body: JSON.stringify(data)
});

fetch(request)
  .then(function(response){
    response.json()
      .then(function(data) {
        console.log(data)
      })
  })
  .catch(function(err) {
    console.log(err)
  })
  document.getElementById("user_alter_email").value = '';
  document.getElementById("user_alter_password").value = '';
  document.getElementById("user_alter_newname").value = '';

  document.getElementById("nameChangeMessage").innerHTML = 'Name successfully changed! Please re-login';
}

window.onload = function() {
        let data = {
          user_email: variable1,
          user_password: variable2
        };
        //MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
        var request = new Request('http://localhost:3000/api/userDataPull', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(data)
        });
        
        fetch(request)
          .then(function(response){
            response.json()
              .then(function(data) {
                console.log(data[0])
                if (variable1 == null) {
                    document.getElementById('displayName').innerHTML = 'Must login';
                }   else {
                document.getElementById('displayName').innerHTML = Object.values(data[0]);
                document.getElementById('displayMessage').innerHTML = `Welcome! This is your page. Currently it shows a JSON version of your name and you can even change it! If you are an
                admin, then you will have access to see all other users in the database, and even delete them or change their roles <br/><br/> Additionally, if you are an admin user,
                you can access the Admin Panel with the "Admin Dashboard" button below Change Username.`
                document.getElementById('changeNameForm').style.display = 'initial';
                }
              })
          })
          .catch(function(err) {
            console.log(err)
          })
          localStorage.clear();
  };


const Dashboard = () => {
    return <div class="container">
        <br/>
        <br/>
        <br/>
        <br/>
        <h2 id="displayName">Must login first.</h2>
        <br/>
        <p id="displayMessage"></p>
        <br></br>
        <form id="changeNameForm">
        <input type="email" class="form-control" id="user_alter_email" aria-describedby="emailHelp" placeholder="Enter Email"/>
        <input type="password" class="form-control" id="user_alter_password" aria-describedby="emailHelp" placeholder="Enter Password"/>
        <input type="text" class="form-control" id="user_alter_newname" aria-describedby="emailHelp" placeholder="Enter New Name"/>
        <br/>
        <h2 id="nameChangeMessage"></h2>
        <button class="btn btn-dark" onClick={changeUserName} >Change username</button>
        <br/>
        <br/>
        <button class="btn btn-dark" onClick={tryAdminPanel}>Admin Dashboard</button>
        <h2 id="adminPanelMessage"></h2>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>;
  };
  
  export default Dashboard;