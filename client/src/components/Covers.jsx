import React, { Component } from 'react';
import Header from './Header';
import Popins from './Popins';
import {connect} from 'react-redux';
import {shuffleTracks, addCompletedSong} from '../actions/index';
import '../style.css';
import anime from 'animejs';
import _ from 'lodash';

class Covers extends Component {
    constructor(props){
        super(props);
        this.state = {
            covers : [],
            currentCount: 30,
            playing : false,
            audio: null,
            scoring: 0,
            nbSong: 0,
            popType: '',
            initCount: true,
            currentSong: '',
            currentTime: 0,
            initTime: ''
        };
    }

    componentWillReceiveProps(nextProps){
        let {songs} = nextProps;

        if(songs.length){
            this.playTrack(songs);
        }else{
            this.setState({
                popType: 'final'
            });
            clearInterval(this.state.initTime);
        }

        if(this.state.initCount){
            this.initTimer();
            this.setState({initCount: false});
        }
    }

    initTimer(){
        this.setState({
            initTime: setInterval(() => {
                this.timer();
            },1000)
        });
    }

    playFX(fx, ctx){
        if(fx === 'fadeIn'){
            anime({
                targets : document.getElementsByClassName('cover'),
                opacity: 1,
                scale : 1,
                borderRadius: 0,
                duration: 400,
                easing: 'easeOutSine'
            });

        }else{
            anime({
                targets : ctx,
                borderRadius: {
                    value : "50%",
                    duration : 800,
                    easing: 'easeInOutSine'
                },
                opacity: 0,
                scale : 0,
                duration: 800,
                easing: 'easeInOutSine'
            });
        }

    }

    resetPopups(){
        setTimeout(() => {
            this.setState({popType: ''});
        },1000)
    }



    componentDidUpdate(prevProps){
        let {songs} = prevProps;
        if(this.state.currentCount === 0 ){
            this.playFX('fadeIn');
            this.setState({
                currentCount : 30,
                popType: 'next'
            });
            this.state.audio.pause();
            this.updateSongList(songs, songs[0].id);
            if(songs.length !== 1){
                this.resetPopups();
            }
        }
    }

    componentWillMount(){
        const BASE_URL = '/songs.json';
        fetch(BASE_URL, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({covers: _.shuffle(json)})
            });
    }

    timer(){
        this.setState({ currentCount: this.state.currentCount - 1 });
    }

    updateSongList(songs, index){
        this.props.shuffleTracks(songs);
        this.props.addCompletedSong(songs, index);
    }

    playTrack(newSongs){
        let songs = newSongs;
        let audio = new Audio(songs[0].track);
        this.setState({ nbSong: this.state.nbSong + 1 });
        if(!this.state.playing){
            audio.addEventListener('loadedmetadata', function() {
                audio.play();
                console.log("Playing " + audio.src + ", for: " + audio.duration + "seconds.");
            });
            this.setState({
                playing: true,
                audio
            });
        }else{
            this.state.audio.pause();
            audio.play();
            this.setState({
                playing: true,
                audio
            })
        }
    }

    matchTracks(index, ctx){
        const cover = ctx.parentNode;
        let {songs} = this.props;
        if(songs[0].id === index){
            this.setState({
                currentCount: 30,
                scoring: this.state.scoring + 1,
                popType: 'right'
            });
            this.state.audio.pause();
            this.updateSongList(songs, songs[0].id);
            this.playFX('fadeIn');
            if(songs.length !== 1){
                this.resetPopups();
            }
        }else{
            this.setState({popType: 'wrong'});
            this.playFX(null,cover);
            this.resetPopups();
        }
    }

    render() {
        return (
            <div className="playground">
                <Popins
                    type={this.state.popType}
                    covers={this.state.covers}
                    score={this.state.scoring}
                    totalScore={this.state.covers.length}
                    currentSong={this.state.currentSong}
                />
                <Header
                    timer={this.state.currentCount}
                    score={this.state.scoring}
                    songLeft={this.state.nbSong}
                    totalSongs={this.state.covers.length}
                    totalScore={this.state.covers.length}
                />
                <div className="covers-grid">
                    <div className="cover-logo">
                        <img src="../img/logo.jpg" alt="logo"/>
                    </div>
                    {
                        this.state.covers.map((cover) => {
                            return (
                                <div className="cover" key={cover.id} onClick={(e) => this.matchTracks(cover.id, e.target)}>
                                    <div className="infos">
                                        {/*<p className="title">{cover.title}</p>*/}
                                        <p className="artist">{cover.artist}</p>
                                    </div>
                                    <img src={cover.picture} alt={cover.artist} />
                                </div>
                            )
                        })
                    }
                    <div className="credits">
                        <div className="credit-content">
                            <h1>A project by</h1>
                            <p>Pereira Marine</p>
                            <p>Derouiche Hymen</p>
                            <p>Blumenfeld Claire</p>
                            <p>Jay Pauline</p>
                            <p>Houssin Yannick</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    const {counter, songs} = state;
    return {
        songs,
        counter
    }
}
export default connect(mapStateToProps, {shuffleTracks, addCompletedSong})(Covers);
