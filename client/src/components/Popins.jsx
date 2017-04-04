import React, { Component } from 'react';
import { connect } from 'react-redux';
import { launchAction, shuffleTracks } from '../actions/index'
import '../style.css';

class Popins extends Component {
    constructor(props){
        super(props);
    }
    rightAnswer(){
        return (
            <div className="right-pop popin">
                <div className="pop-content">
                    <p>Yeeeey ! You earned 1 point.</p>
                    <p>Here is your score : {this.state.scoring}</p>
                </div>
            </div>
        )
    }

    wrongAnswer(){
        return(
            <div className="wrong-pop popin">
                <div className="pop-content">
                    <p>Nop ! Try again !</p>
                </div>
            </div>
        )
    }

    launcher(){
        return(
            <div className="launcher-pop popin">
                <div className="pop-content">
                    <h3>Find in <span className="counter">30s</span> seconds the right cover to the song.</h3>
                    <h4>Don't forget to activate your headphones!</h4>
                    <button onClick={() => this.launch()}>Launch</button>
                </div>
            </div>
        )
    }

    tooSlow(){
        return(
            <div className="nextTrack-pop popin">
                <div className="pop-content">
                    <p>Too slow bud !</p>
                </div>
            </div>
        )
    }

    launch(){
        this.props.launchAction(true);
        this.props.shuffleTracks(this.props.covers);
        console.log(this.props);
    }
    render() {
        const popType = this.props.type;
        let popin = null;
        (popType === 'right') ? popin = this.rightAnswer() : '';
        (popType === 'wrong') ? popin = this.wrongAnswer() : '';
        (popType === 'launcher') ? popin = this.launcher() : '';
        (popType === 'next') ? popin = this.tooSlow() : '';
        return (
            <div>
                {popin}
            </div>

        );
    }
}
function mapStateToProps(state){
    let {launch} = state;
    return {
        launch
    }
}
export default connect(mapStateToProps, {launchAction, shuffleTracks})(Popins);
