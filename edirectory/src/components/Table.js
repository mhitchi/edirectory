import React, { Component } from "react";
import API from "../utils/API";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      isLoaded: false,
      items: [],
    };
    //preserve initial state in a new object
    this.initialState = this.state;
  }

  //reset state to initial state
  resetState = () => {
    this.setState(this.initialState);
    this.getUsers();
  }

  componentDidMount() {
    this.getUsers();
  }

  //from lesson 19
  getUsers = () => {
    API.search().then(res => {
      // TODO res returning undefined
      console.log(res);
      this.setState({
        isLoaded: true,
        items: res.data.results
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({ err })
    })
  }
  handleTyping = (event) => {
    event.preventDefault();
    
    const newItems = [];

    //iterate through items, check if last name includes input, add matches to newItems arr
    for( let i = 0; i < this.state.items.length; i++) {
      let item = this.state.items[i];
      
      if( item.name.last.includes(event.target.value) ){
        newItems.push(this.state.items[i]);
      }
    }
    //if input exists, set state items to newItems arr, else if input is empty, items return to default
    if( event.target.value.trim() !== "" ) {
      this.setState({
        items: newItems
      })
    } else if( event.target.value.trim() === "" ) {
      this.resetState()
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if( error ) {
      return <div>Error: {error.message}</div>
    } else if( !isLoaded ) {
      return <div>Loading...</div>
    } else {
      return (
        <>
          <input onChange={this.handleTyping} type="search" placeholder="Search"></input>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              { items.map(row => (
                  <tr key={row.id.value}>
                    <td>
                      {row.name.first} {row.name.last}
                    </td>
                    <td>{row.phone}</td>
                    <td>{row.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )
    }
  }
}
export default Table;