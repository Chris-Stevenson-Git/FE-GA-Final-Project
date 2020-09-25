import React from 'react';
import {HashRouter as Router, Route, Link} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import FrontPage from './components/FrontPage'

import './css/Home.css'
import './css/NavBar.css'
import './css/FrontPage.css'
import './css/Form.css'

// const BASE_URL = 'https://ga-final-proj-backend.herokuapp.com'
const BASE_URL = 'http://localhost:3000'

class App extends React.Component{

  state = {
    current_user_name: undefined,
    current_user_id: undefined

  }

  componentDidMount(){
    this.setCurrentUser();
  }

  setCurrentUser = () => {
    let token = `Bearer ${localStorage.getItem('cwLoginToken')}`
    fetch(`${BASE_URL}/users/current`, {
      headers: {'Authorization': token}
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      //this will return null if the request 'successfully fails'
      if(data != null){
        this.setState({current_user_name: data.name, current_user_id: data.id })
      }
    })
    .catch(err => console.warn(err))
  }

  //function to log the user out.
  handleLogout = () => {
    this.setState({current_user_name: undefined})
    localStorage.removeItem("cwLoginToken");
  }

  render(){
    return(
      <Router>
        <header>
          <nav>
            {/* Show one of two nav bars depending on if the user is logged in */}
            {
              this.state.current_user_name !== undefined
              ?
              (
                <ul>
                  <li>Welcome {this.state.current_user_name} | </li>
                  <li><Link onClick={this.handleLogout} to='/'>Logout</Link></li>
                </ul>
              )
              :
              (
                <ul>
                  <li><Link to='/login'>Login/Signup</Link></li>
                </ul>
              )
            }
          </nav>
        </header>
        {
          this.state.current_user_name !== undefined
          ?
          <Route
            exact path='/'
            render={(props) => <Home userID={this.state.current_user_id}{...props}/>}
            />
          :
          <Route exact path='/' component={FrontPage}/>
        }
        <Route
          exact path='/login'
          render={(props) => <Login setCurrentUser={this.setCurrentUser}{...props}/>}
          />
      </Router>
    )//return
  }//render

}//class App


export default App;
