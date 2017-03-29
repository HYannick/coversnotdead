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
                    <h3>Trouves en 30 secondes la pochette qui correspond à la musique.</h3>
                    <h4>N'oublie pas d'activer tes enceintes !</h4>
                </div>
                <div className="item score">
                    <p className="nb-points">Nombre de points : {this.state.scoring}/30</p>
                    <p className="nb-songs">Nombre de chansons : {this.state.nbSong}/30</p>
                </div>

            </div>
        );
    }
}
export default Header;
