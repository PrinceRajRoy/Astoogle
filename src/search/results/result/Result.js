import React from 'react';
import './Result.css';

class result extends React.Component {
  
  state = {
      values: []
  };

  componentDidMount = () => {
      this.setState({values: Object.values(this.props)})
  }

  render() {
        return (
            <tr id="result">
                <th scope="row">
                    {this.state.values[0]}
                </th>
                <td>
                    {this.state.values[1]}
                </td>
                <td>
                    {this.state.values[2]}
                </td>
                <td>
                    {this.state.values[3]}
                </td>
                <td>
                    {this.state.values[4]}
                </td>
                <td>
                    {this.state.values[5]}
                </td>
                <td>
                    {this.state.values[6]}
                </td>
            </tr>
        );
    }
}

export default result;
