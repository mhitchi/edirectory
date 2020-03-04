import React, { Component } from "react";
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
    this.getUsers();
  }
  //from lesson 19
  getUsers = () => {
    API.search().then(res => {
      // TODO res returning undefined
      console.log(res);
      this.setState({
        isLoaded: true,
        items: res.data
      })
    })
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
              { items.results.map(row => (
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