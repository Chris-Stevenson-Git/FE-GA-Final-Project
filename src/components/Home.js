import React from 'react'

import AddMember from './AddMember'
import AddChore from './AddChore'

// const BASE_URL = 'https://ga-final-proj-backend.herokuapp.com'
const BASE_URL = 'http://localhost:3000'


class Home extends React.Component{

  state = {
    myHouseholds: [],
    currentHousehold: '',
    dashboard: {
      users: [],
      chores: []
    },
    current_user_id: undefined,
    owner: false,
    addMember: false,
    addChore: false,
    scheduledForDeleting: [],
    scheduledForCompleting: []
  }

  componentDidMount(){
    //Get a list of the current households this user belongs to.
    let token = `Bearer ${localStorage.getItem('cwLoginToken')}`
    fetch(`${BASE_URL}/my_households`, {
      headers: {'Authorization': token}
    })
    .then(response => response.json())
    .then(data => {
      this.setState({myHouseholds: data, currentHousehold: data[0].name})
      this.setDashboard();
    })
    .catch(err => console.warn(err))
  }

  //function to set the data of the dashboard
  setDashboard = () => {
    const h = this.state.myHouseholds.find(household => household.name === this.state.currentHousehold);

    //Get details from the current household
    let token = `Bearer ${localStorage.getItem('cwLoginToken')}`
    fetch(`${BASE_URL}/household/${h.id}`, {
      headers: {'Authorization': token}
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({dashboard: data})
      if(data.owner === this.props.userID){
        this.setState({owner: true})
      } else {
        this.setState({owner: false})
      }
    })
    .catch(err => console.warn(err))

    //Deselect all checkboxes in the DOM
    const inputs = document.getElementsByTagName('input')
    for(let i = 0; i < inputs.length; i++ ){
      if(inputs[i].type === 'checkbox'){
        inputs[i].checked = false;
      }
    }

  }//setDashboard

  //function to set the current household in state
  setCurrentHousehold = (ev) => {
    this.setState({currentHousehold: ev.target.value})
  }

  toggleAddMember = () => {
    if(this.state.addMember === false){
      this.setState({addMember: true})
    } else {
      this.setState({addMember: false})
    }
  }

  toggleAddChore = () => {
    if(this.state.addChore === false){
      this.setState({addChore: true})
    } else {
      this.setState({addChore: false})
    }
  }

  //Function to add ticked chores to a list of chores that will be deleted
  addToDeleteSchedule = (ev) => {
    let currentSchedule = this.state.scheduledForDeleting
    if(currentSchedule.includes(ev.target.value)){
      const index = currentSchedule.indexOf(ev.target.value)
      currentSchedule.splice(index, 1)
    } else {
      currentSchedule.push(ev.target.value)
    }
    this.setState({scheduledForDeleting: currentSchedule})
  }

  //Function to delete chores from the DB
  delChores = () => {
    let token = `Bearer ${localStorage.getItem('cwLoginToken')}`
    fetch(`${BASE_URL}/del_chores`, {
      headers: { "Content-Type": "application/json; charset=utf-8",
                'Authorization': token},
      method: 'POST',
      body: JSON.stringify({
        chores: this.state.scheduledForDeleting
      })
    })
    .then(res => {
      this.setState({scheduledForDeleting: []})
      this.setDashboard()
    })
    .catch(err => console.warn(err))
  }

  //Function to add ticked 'my chores' to state
  addToCompletedSchedule = (ev) => {
    let currentSchedule = this.state.scheduledForCompleting
    if(currentSchedule.includes(ev.target.value)){
      const index = currentSchedule.indexOf(ev.target.value)
      currentSchedule.splice(index, 1)
    } else {
      currentSchedule.push(ev.target.value)
    }
    this.setState({scheduledForCompleting: currentSchedule})
  }

  completeChores = () => {
    let token = `Bearer ${localStorage.getItem('cwLoginToken')}`
    fetch(`${BASE_URL}/complete_chores`, {
      headers: { "Content-Type": "application/json; charset=utf-8",
                'Authorization': token},
      method: 'PATCH',
      body: JSON.stringify({
        chores: this.state.scheduledForCompleting
      })
    })
    .then(res => {
      this.setState({scheduledForCompleting: []})
      this.setDashboard()
    })
    .catch(err => console.warn(err))
  }


  render(){
    return(
      <div>
        {
          this.state.addMember
          &&
          <AddMember
            hide={this.toggleAddMember}
            householdName={this.state.currentHousehold}
            householdID={this.state.dashboard.id}
            refresh={this.setDashboard}
          />
        }
        {
          this.state.addChore
          &&
          <AddChore
            hide={this.toggleAddChore}
            householdName={this.state.currentHousehold}
            householdID={this.state.dashboard.id}
            users={this.state.dashboard.users}
            refresh={this.setDashboard}
          />
        }
        <div className='dashboard'>
          <h1>Dashboard for </h1>
          <select onChange={this.setCurrentHousehold}>
            {
              this.state.myHouseholds.map(h => {
                return <option>{h.name}</option>
              })
            }
          </select>
          <button onClick={this.setDashboard}>Load</button>
        </div>

        <div className='householdMembers'>
          <h2>Members: </h2>
          <ul>
            {
              this.state.dashboard.users.map((user, i) => {
                let cssTag;
                this.state.dashboard.users.map(u => {
                  if(u.id === user.id){
                    cssTag = `member${this.state.dashboard.users.indexOf(u)}`
                  }
                })
                return <li className={cssTag}>{user.first_name} {user.last_name.charAt(0)}.</li>
              })
            }
            {
              this.state.owner && <li onClick={this.toggleAddMember}>Add Member...</li>
            }
          </ul>
        </div>

        <div className='myChores'>
          <h2>My Chores</h2>
          <ul>
            {
              this.state.dashboard.chores.map(chore => {
                if(this.props.userID === parseInt(chore.user_id)){
                  const i = `myChores${chore.id}`
                  let completed_css = 'chore incomplete'
                  if(chore.completed){
                    completed_css = 'chore completed'
                  }
                  return <div className={completed_css}>
                    {
                      chore.completed === false &&
                      <input
                        type='checkbox'
                        value={chore.id}
                        id={i}
                        onClick={this.addToCompletedSchedule}/>
                    }
                    <label htmlFor={i}>{chore.name}</label>
                  </div>
                }
              })
            }
          </ul>
          <button onClick={this.completeChores}>Mark Completed</button>
        </div>

        <div className='allChores'>
          <h2>All Chores: </h2>
          <ul>
            {
              this.state.owner && <li className='addChore' onClick={this.toggleAddChore}>Add Chore...</li>
            }
            {
              this.state.dashboard.chores.map(chore => {
                let cssTag;
                this.state.dashboard.users.map(u => {
                  if(u.id === parseInt(chore.user_id)){
                    cssTag = `member${this.state.dashboard.users.indexOf(u)}`
                  }
                })
                const i = `allChores${chore.id}`
                return <li className={cssTag}>
                  <input type='checkbox' value={chore.id} id={i} onClick={this.addToDeleteSchedule}/>
                  <label htmlFor={i}>{chore.name}</label>
                </li>
              })
            }
          </ul>
          {
            this.state.owner && <button onClick={this.delChores}>Delete</button>
          }
        </div>
      </div>
    )//return
  }//render
} //class Home

export default Home
