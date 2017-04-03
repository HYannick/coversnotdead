import React, { Component } from 'react';
import '../style.css';

class Header extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="head-cover">
                <div className="item logo">
                    <img width="100%" src="./img/logo.gif" alt="logo"/>
                </div>
                <div className="item instructions">
                    <h3>Find in 30 seconds the right cover to the song.</h3>
                    <h4>Don't forget to activate your headphones!</h4>
                    <p className="counter">{this.props.timer} s</p>
                </div>
                <div className="item score">
                    <p className="nb-points">Score : {this.props.score}/30</p>
                    <p className="nb-songs">Songs : {this.props.songLeft}/{this.props.totalSongs}</p>
                </div>
            </div>
        );
    }
}
export default Header;
