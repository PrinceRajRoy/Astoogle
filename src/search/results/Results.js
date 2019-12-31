import React from 'react';
import { connect } from 'react-redux';
import './Results.css';
import Result from './result/Result';

class results extends React.Component {

  state = {
      results: []
  };

  componentDidMount = () => {
    var count = 1;
    var results = [];
    this.setState({results: this.props.results});
    for(let i in this.props.data){
        let props = this.props.data[i];
        props['key'] = count;
        results = [...results, 
            <Result {...props} />
        ];
        count++;
    }
    this.setState({results: results});
  }

  render() {
        return (
            <div className="table-responsive">
            <table id="results" className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">
                            {this.props.keys[0]}
                        </th>
                        <th scope="col">
                            {this.props.keys[1]}
                        </th>
                        <th scope="col">
                            {this.props.keys[2]}
                        </th>
                        <th scope="col">
                            {this.props.keys[3]}
                        </th>
                        <th scope="col">
                            {this.props.keys[4]}
                        </th>
                        <th scope="col">
                            {this.props.keys[5]}
                        </th>
                        <th scope="col">
                            {this.props.keys[6]}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.results}
                </tbody>
            </table></div>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
        keys: state.keys
    }
};

export default connect(mapStateToProps)(results);
