import React from 'react'

const BASE_URL = 'http://localhost:3000'

class AddMember extends React.Component{

  state = {
    email: '',
    error: ''
  }

  handleInput = (ev) => {
    this.setState({email: ev.target.value})
  }

  handleSubmit = (ev) => {
    let token = `Bearer ${localStorage.getItem('cwLoginToken')}`
    fetch(`${BASE_URL}/add_member_to_household`, {
      headers: { "Content-Type": "application/json; charset=utf-8",
                'Authorization': token},
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email,
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
          <h2>Add Member to {this.props.householdName}</h2>
          {
            this.state.error !== '' && <p>{this.state.error}</p>
          }
            <input
              onChange={this.handleInput}
              name="email"
              type="email"
              placeholder="Member's Email"
            />
          <button>Add</button>
        </form>
        <button onClick={this.props.hide}>Close</button>
      </div>
    );
  }//render
}//Add Member class

export default AddMember
