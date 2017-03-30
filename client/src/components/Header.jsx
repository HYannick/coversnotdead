import React, { Component } from 'react';
import '../style.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            scoring: 0,
            nbSong: 0,
        }
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
                </div>
                <div className="item score">
                    <p className="nb-points">Score : {this.state.scoring}/30</p>
                    <p className="nb-songs">Songs : {this.state.nbSong}/30</p>
                </div>

            </div>
        );
    }
}
export default Header;
