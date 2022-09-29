import React, { Component } from 'react';
import './App.css';
import { Link, redirect } from 'react-router-dom';
import {Navigate} from 'react-router-dom';


const changeForm=(e)=> {
if (e.target.innerHTML == 'Login') {
  document.getElementById('SUF').style.display = 'none';
  document.getElementById('LF').style.display = 'initial';
} else if(e.target.innerHTML == 'Sign-Up') {
  document.getElementById('LF').style.display = 'none';
  document.getElementById('SUF').style.display = 'initial';
}
}




class App extends Component {

  constructor() {
    super();
    this.state = {
      title: 'Simple CRUD Application',
      countries: []
    }
  }


  // MAKE AJAX CALLS
componentDidMount() {
  console.log('COMPONENT HAS MOUNTED')
}


addNewUser(event) {
event.preventDefault();
let data = {
  user_name: document.getElementById("user_name").value,
  user_email: document.getElementById("user_email").value,
  user_password: document.getElementById("user_password").value
};
//MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
var request = new Request('http://localhost:3000/api/new-user', {
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
  document.getElementById("user_name").value = '';
  document.getElementById("user_email").value = '';
  document.getElementById("user_password").value = '';

  document.getElementById("postMessage").innerHTML = 'Account created! Please try signing in.';
}

userLogin(event) {
  event.preventDefault();
  let data = {
    user_email: document.getElementById("user_login_email").value,
    user_password: document.getElementById("user_login_password").value
  };
  //MAKE A REQUEST TO THE BACK END/API I SET UP IN PG-API DIRECTORY
  var request = new Request('http://localhost:3000/api/userLogin', {
  method: 'POST',
  headers: new Headers({ 'Content-Type': 'application/json' }),
  body: JSON.stringify(data)
  });
  
  fetch(request)
    .then(function(response){
      response.json()
        .then(function(data) {
          console.log(data)
          if (data == 'failure') {
            console.log('boo')
          } else if (data == 'success') {
            console.log('hooray')
            localStorage.setItem("emailKey", document.getElementById("user_login_email").value);
            localStorage.setItem("passwordKey", document.getElementById("user_login_password").value);
            window.location.replace('/Dashboard');
          }
        })
    })
    .catch(function(err) {
      console.log(err)
    })
  
    document.getElementById("postMessage").innerHTML = 'Seems like this didnt work. Try again or create an account.';
  }

render() {
  let title = this.state.title;
  return (
    <div className="container LOGIN">
        <div id="loginElements">

        <center><img src={require('./fridayLogo.png')}/></center>
        <button onClick={changeForm} type="submit" class="btn btn-dark">Login</button>  <button onClick={changeForm} type="submit" class="btn btn-dark">Sign-Up</button>
        <br/><br/>
        <form id="SUF" ref="signupForm">
      <div class="form-group">
  <input type="text" class="form-control" id="user_name" aria-describedby="emailHelp" placeholder="Enter username"/>
  </div>
  <div class="form-group">
  <input type="email" class="form-control" id="user_email" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div class="form-group">
  <input type="password" class="form-control" id="user_password" placeholder="Password"/>
  </div>
  <br/>
  <h2 id="postMessage"></h2>
  <button type="submit" class="btn btn-dark" onClick={this.addNewUser.bind(this)}>Sign-Up</button>
  </form>
  {/*I know I should've just made the two forms into callable functions to return them but I was pretty shot by this point and just did this quick. I could change it in the future*/}
  <form id="LF" ref="loginForm">
  <div class="form-group">
  <input type="email" class="form-control" id="user_login_email" aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>
  <div class="form-group">
  <input type="password" class="form-control" id="user_login_password" placeholder="Password"/>
  </div>
  <br/>
  <h2 id="postMessage"></h2>
  <button type="submit" class="btn btn-dark" onClick={this.userLogin.bind(this)}>Login</button>
  </form>
</div>
    </div>
  );
}

}

export default App;
