import React from 'react';
import './browse.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Nav from '../../nav/nav';
import Results from '../results/Results';

class browse extends React.Component {

  state = {
      dataReceived: false,
      load: ''
  };

  componentDidMount() {
    this.setState({dataReceived: false, load: 'Loading...'});
    fetch("https://api.nasa.gov/neo/rest/v1/neo/browse?api_key="+ this.props.apiKey)
    .then(res => res.json())
    .then(data => {
        var temp = [];
        data = data.near_earth_objects;
        for(let i = 1; i <= Math.min(10, data.length); i++){
            temp.push({
                "Sl. No": i,
                "ID": data[i].id,
                "Name": data[i].name,
                "First Observed On": data[i].orbital_data.first_observation_date,
                "Orbital Period (days)": data[i].orbital_data.orbital_period,
                "Absolute Magnitude": data[i].absolute_magnitude_h,
                "Equinox": data[i].orbital_data.equinox
            });
        }
        this.props.addData(temp);
        this.setState({dataReceived: true});
    });
  }
  
  render() {
        return (
            <div>
                <Nav path={'/browse'}/>
                <div id="browse">
                    {
                        this.state.dataReceived ?
                        <Results /> :
                        <div id="load">{this.state.load}</div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        apiKey: state.apiKey
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addData: temp => dispatch({type: actionTypes.ADD_DATA, data: temp})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(browse);
