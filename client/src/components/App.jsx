import React, { Component } from 'react';
import {connect} from 'react-redux';
import { checkScore } from '../actions';
import '../style.css';
import Header from './Header';
import Covers from './Covers';
class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            scoring: 0
        }
    }
    increment(){
        this.setState({scoring: this.state.scoring+1});
        this.props.checkScore(this.state.scoring);
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <Covers/>

                <h2>Covers not dead</h2>

                <button onClick={() => this.increment()}>increment</button>
                {this.props.scoring.score}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
      scoring: state
    }
}
export default connect(mapStateToProps, {checkScore})(App);
