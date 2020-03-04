import React, { Component } from "react";


class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://randomuser.me/")
      .then(res => JSON.parse(res))
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
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