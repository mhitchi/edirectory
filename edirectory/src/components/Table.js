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
    .then(results => 
      this.setState({
        isLoaded: true,
        items: results.items
      }))
      .catch(err => {
        console.log(err);
        this.setState({ err })
      })
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if( error ) {
      return <div>Error: {error.message}</div>
    } else if( !isLoaded ) {
      return <div>Loading...</div>
    } else {
      return (
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