import React, { Component } from "react";
import axios from "axios";
import API from "../utils/API";


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    // fetch("https://randomuser.me/")
    //   // TRIED .then(res => res.json())
    //   // TRIED .then(res => JSON.parse())
    //   .then(res => res.json())
    //   .then(
    //     result => {
    //       this.setState({
    //         isLoaded: true,
    //         items: result.items
    //       });
    //     },
    //     error => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }
    //   )
    this.getUsers();
  }

  //from lesson 19
  getUsers = () => {
    API.search()
    .then(res => 
      // TODO res returning undefined
      console.log(res),
      this.setState({
        isLoaded: true,
        items: res.items
      }))
      .catch(err => {
        console.log(err);
        this.setState({ err })
      })
  }

  handleTyping = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    //TODO handle input here
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if( error ) {
      return <div>Error: {error.message}</div>
    } else if( !isLoaded ) {
      return <div>Loading...</div>
    } else {
      return (
        <input onChange={handleTyping} type="search" placeholder="Search"></input>
        <table className="table">
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </thead>
          <tbody>
          { items.results.map(row => (
                <tr key={row.id.value}>
                  <td>
                    {row.name.first}
                  </td>
                  <td>{row.cost}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )
    }
  }
}

export default Table;