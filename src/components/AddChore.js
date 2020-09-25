import React from 'react'

// const BASE_URL = 'https://ga-final-proj-backend.herokuapp.com'
const BASE_URL = 'http://localhost:3000'


class AddChore extends React.Component{

  state = {
    name: '',
    location: '',
    est_time: '',
    user: '',
    frequency: '',
    error: ''
  }

  handleInput = (ev) => {
    switch(ev.target.name){
      case 'name':
        this.setState({name: ev.target.value})
        break;
      case 'location':
        this.setState({location: ev.target.value})
        break;
      case 'est_time':
        this.setState({est_time: ev.target.value})
        break;
      case 'user':
        this.setState({user: ev.target.value})
        break;
      case 'frequency':
        this.setState({frequency: ev.target.value})
    }
  }

  handleSubmit = (ev) => {
    let token = `Bearer ${localStorage.getItem('cwLoginToken')}`
    fetch(`${BASE_URL}/add_chore_to_household`, {
      headers: { "Content-Type": "application/json; charset=utf-8",
                'Authorization': token},
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        location: this.state.location,
        est_time: this.state.est_time,
        user: this.state.user,
        frequency: this.state.frequency,
        household: this.props.householdID
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.result === 'ERROR'){
        this.setState({error: data.message})
      } else {
        this.props.refresh();
        this.props.hide();
      }
    })
    .catch(err => console.warn(err))

    ev.preventDefault();
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Add Chore to {this.props.householdName}</h2>
          {
            this.state.error !== '' && <p>{this.state.error}</p>
          }
            <input
              onChange={this.handleInput}
              name="name"
              type="text"
              placeholder="Chore name.."
            />
            <br/>
            <input
              onChange={this.handleInput}
              name="location"
              type="text"
              placeholder="Location.."
            />
          <br/>
            <input
              onChange={this.handleInput}
              name="est_time"
              type="number"
              placeholder="Est. duration (mins)"
            />
          <br/>
            <select
              onChange={this.handleInput}
              name='user'
              >
              <option>Auto Assign</option>
              {
                this.props.users.map(user => {
                  return <option value={user.id}>{user.first_name}</option>
                })
              }
            </select>
            <br/>
            <input
              onChange={this.handleInput}
              name="frequency"
              type="number"
              placeholder="Days before it has to be repeated"
            />
          <br/>
          <button>Add</button>
        </form>
        <button onClick={this.props.hide}>Close</button>
      </div>
    );
  }//render
}//Add Chore class

export default AddChore
