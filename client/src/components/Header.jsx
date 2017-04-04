import React, { Component } from 'react';
import '../style.css';

class Header extends Component {

    render() {
        return (
            <div className="head-cover">
                <div className="item logo">
                    <img width="100%" src="./img/logo.gif" alt="logo"/>
                </div>
                <div className="item instructions">
                    <h3>Find in <span className="counter">{this.props.timer}</span> seconds the right cover to the song.</h3>
                    <h4>Don't forget to activate your headphones!</h4>
                </div>
                <div className="item score">
                    <p className="nb-points">Score : {this.props.score}/{this.props.totalScore}</p>
                    <p className="nb-songs">Songs : {this.props.songLeft}/{this.props.totalSongs}</p>
                </div>
            </div>
        );
    }
}
export default Header;
