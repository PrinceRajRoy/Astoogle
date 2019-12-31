import React from 'react';
import './idSearch.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Nav from '../../nav/nav';
import Results from '../results/Results';

class idSearch extends React.Component {

  state = {
      dataReceived: false,
      load: ''
  };

  getJSON = e => {
    e.preventDefault();
    this.setState({dataReceived: false, load: 'Loading...'});
    var Aid = document.getElementById("Aid").value;
    fetch("https://api.nasa.gov/neo/rest/v1/neo/" + Aid + "?api_key=" + this.props.apiKey)
    .then(res => res.json())
    .then(data => {
        var temp = [{
            "Sl. No": 1,
            "Name": data.name,
            "First Observed On": data.orbital_data.first_observation_date,
            "Orbital Period (days)": data.orbital_data.orbital_period,
            "Orbit Class Type": data.orbital_data.orbit_class.orbit_class_type,
            "Absolute Magnitude": data.absolute_magnitude_h,
            "Equinox": data.orbital_data.equinox}]
        this.props.addData(temp);
        this.setState({dataReceived: true});
    });
  }
  
  render() {
        return (
            <div>
                <Nav path={'/idS'}/>
                <div id="idSearch">
                    <form onSubmit={this.getJSON} className="row text-center">
                        <input className="form-control offset-md-1 col-md-6" id="Aid" placeholder="Enter Asteroid ID" type="number"/>
                        <button className="btn btn-success">Submit</button>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(idSearch);
