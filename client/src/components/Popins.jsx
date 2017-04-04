import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shuffleTracks } from '../actions/index'
import '../style.css';

class Popins extends Component {

    constructor(props){
        super(props);
        this.state = {
            displayPopLaunch : true,
            currentTrack : ''
        }
    }

    rightAnswer(){
        console.log(this.props);
        return (
            <div className="right-pop popin">
                <div className="pop-content">
                    <p>Yeeeey ! You earned 1 point.</p>
                    <p>The artist is : {this.props.currentSong}</p>
                    <p>Here is your score : {this.props.score}/{this.props.totalScore}</p>
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

    results(){
        let {score, totalScore} = this.props;
        let endSentence = '';
        if(score>=0 && score<=12){
            endSentence = <h3>Well, you have got some marge buddy !</h3>
        }else if(score>=13 && score<=22){
            endSentence = <h3>Well, you are on the good road !</h3>
        }else if(score>=23 && score<=totalScore){
            endSentence = <h3>Well, you are really a rockstar ! Congratulations !</h3>
        }
        return(
            <div className="final-pop popin">
                <div className="pop-content">
                    <h3>Well done !</h3>
                    {endSentence}
                    <h4>Here your final score</h4>
                    <h1>{score}/{totalScore}</h1>
                    <button>Retry</button>
                </div>
            </div>
        )
    }
    tooSlow(){
        return(
            <div className="nextTrack-pop popin">
                <div className="pop-content">
                    <p>Too slow bud' !</p>
                </div>
            </div>
        )
    }

    launch(){
        this.setState({displayPopLaunch: false});
        this.props.shuffleTracks(this.props.covers);
    }

    render() {
        const popType = this.props.type;
        let popin = null;

        (this.state.displayPopLaunch) ? popin = this.launcher() : '';
        (popType === 'right') ? popin = this.rightAnswer() : '';
        (popType === 'wrong') ? popin = this.wrongAnswer() : '';
        (popType === 'next') ? popin = this.tooSlow() : '';
        (popType === 'final') ? popin = this.results() : '';

        return (
            <div>
                {popin}
            </div>

        );
    }
}

export default connect(null, {shuffleTracks})(Popins);
