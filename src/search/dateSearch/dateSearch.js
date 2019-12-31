import React from 'react';
import './dateSearch.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Nav from '../../nav/nav';
import Results from '../results/Results';

class dateSearch extends React.Component {

  state = {
      dataReceived: false,
      load: ''
  };

  swap = (arr, a, b) => {
      let temp = arr[a];
      arr[a] = arr[b];
      arr[b] = temp;
      temp = arr[a]['Sl. No']
      arr[a]['Sl. No'] = arr[b]['Sl. No'];
      arr[b]['Sl. No'] = temp;
  }

  getJSON = e => {
    e.preventDefault();
    this.setState({dataReceived: false, load: ''});
    var startD = document.getElementById("startD").value;
    var endD = document.getElementById("endD").value;
    var difference = (new Date(endD).getTime() - new Date(startD).getTime()) / (1000 * 3600 * 24);
    if(difference < 7) {
        this.setState({load: 'Loading...'});
        document.getElementById("dExceed").style.display = "none";
        fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date=" + startD + "&end_date=" + endD + "&api_key=" + this.props.apiKey)
        .then(res => res.json())
        .then(data => {
            var temp = [];
            var count = 0;
            data = data.near_earth_objects;
            for(let i in data){
                for(let j = 0; j < data[i].length; j++, count++){
                    temp.push({
                        "Sl. No": count+1,
                        "ID": data[i][j].id,
                        "Name": data[i][j].name,
                        "Close Approach Date": data[i][j].close_approach_data[0].close_approach_date,
                        "Velocity (km/s)": data[i][j].close_approach_data[0].relative_velocity.kilometers_per_second,
                        "Absolute Magnitude": data[i][j].absolute_magnitude_h,
                        "Miss Distance (AU)": data[i][j].close_approach_data[0].miss_distance.astronomical
                    });
                }
            }
            count = 0;
            for(let i=0; i < temp.length && count < 10; i++, count++) {
                var d1 = Date.parse(temp[i]["Close Approach Date"]);
                for(let j = i; j < temp.length; j++){
                    var d2 = Date.parse(temp[j]["Close Approach Date"]);
                    if(d1 > d2)
                        this.swap(temp, j, i)
                }
            }
            temp = temp.slice(0, Math.min(10, temp.length));
            this.props.addData(temp);
            this.setState({dataReceived: true});
        });
    } else {
        document.getElementById("dExceed").style.display = "block";
    }
  }
  
  render() {
        return (
            <div>
                <Nav path={'/dateS'}/>
                <div id="dateSearch">
                    <form onSubmit={this.getJSON} className="row text-center">
                        <div className="col-md-5">
                            <label htmlFor="startD">Start Date</label>
                            <input className="form-control" id="startD" placeholder="Select Start Date" type="date" style={{WebkitAppearance: "none"}}/>
                        </div>
                        <div className="offset-md-2 col-md-5">
                            <label htmlFor="endD">End Date</label>
                            <input className="form-control" id="endD" placeholder="Select End Date" type="date" style={{WebkitAppearance: "none"}}/>
                        </div>
                        <span id="dExceed" className="col-md-12">Please enter dates within 7 days of each other, since API doesn't allow</span><br/><br/><br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(dateSearch);
