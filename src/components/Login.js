import React from 'react'

const BASE_URL = 'https://ga-final-proj-backend.herokuapp.com'

class Login extends React.Component{
  state = {
    form: 'login',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: ''
  }

  //handle typing in the form
  handleInput = (ev) => {
    switch(ev.target.name){
      case 'first_name':
        this.setState({first_name: ev.target.value})
        break;
      case 'last_name':
        this.setState({last_name: ev.target.value})
        break;
      case 'email':
        this.setState({email: ev.target.value})
        break;
      case 'password':
        this.setState({password: ev.target.value})
        break;
      case 'password_confirm':
        this.setState({password_confirm: ev.target.value})
    }
  } //handleInput

  //function to sign up and create an account
  executeSignup = () => {
    if(this.state.password !== this.state.password_confirm){
      console.log('Passwords must match');
      return;
    }

    fetch(`${BASE_URL}/create_user`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password
        }
      })
    })
    .then(data => {
      this.executeLogin();
    })
    .catch(err => console.warn(err))
  }

  executeLogin = () => {
    const request = {'email': this.state.email, 'password': this.state.password}
    fetch(`${BASE_URL}/user_token`, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: 'POST',
      body: JSON.stringify({'auth': request})
    })
    .then(resp => resp.json())
    .then(data => {
      localStorage.setItem("cwLoginToken", data.jwt)
      this.props.setCurrentUser();
      this.props.history.push('/')
    })
    .catch(err => console.warn(err))
  }

  //handle the submit of the login
  handleSubmit = (ev) => {
    const form = this.state.form
    if(form === 'login'){
      this.executeLogin();
    } else {
      this.executeSignup();
    }
    ev.preventDefault();
  }

  setForm = (ev) => {
    this.setState({form: ev.target.getAttribute('name')})
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <div onClick={this.setForm} name='login'>Login</div>
        <div onClick={this.setForm} name='signup'>Sign Up</div>
        {
          this.state.form === 'signup'
          &&
          <div>
            <input
              onChange={this.handleInput}
              name="first_name"
              type="text"
              placeholder='Enter First Name'
              />
            <br/>
            <input
              onChange={this.handleInput}
              name="last_name"
              type="text"
              placeholder='Enter Last Name'
              />
          </div>
        }
        <input
          onChange={this.handleInput}
          name="email"
          type="email"
          placeholder='Enter Email'
        />
        <br/>
        <input
          onChange={this.handleInput}
          name="password"
          type="password"
          placeholder='Enter Password'
        />
        <br/>
        {
          this.state.form === 'signup'
          ?
          <div>
            <input
              onChange={this.handleInput}
              name="password_confirm"
              type="password"
              placeholder='Confirm Password'
            />
          <br/>
          <button>Sign Up</button>
          </div>
          :
          <button>Login</button>
        }
      </form>
    ); // return
  }// render
} // class Login

export default Login
