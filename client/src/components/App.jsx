import React, { Component } from 'react';
import Header from './Header';
import Popins from './Popins';
import {connect} from 'react-redux';
import {shuffleTracks, addCompletedSong, launchAction} from '../actions/index';
import '../style.css';
import anime from 'animejs';

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
            popType: 'launcher',
            rightPopin: false,
            wrongPopin: false,
            launchPopin: true,
            nextSongPopin : false
        }
    }


    componentWillReceiveProps(nextProps){
        let {songList} = nextProps;
        setInterval(() => {
            this.timer();
        },1000);
        this.playTrack(songList);
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

    componentDidUpdate(prevProps){
        let {songList} = prevProps;
        if(this.state.currentCount === 0 ){
            //TODO nice popup
            console.log('too slow bud ! ');
            this.playFX('fadeIn');
            this.setState({currentCount : 30});
            this.state.audio.pause();
            this.updateSongList(songList, songList[0].id);
        }
    }

    componentDidMount(){
        const BASE_URL = '/songs.json';
        fetch(BASE_URL, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({covers: json}, () => {
                    //this.props.shuffleTracks(this.state.covers);
                });
            });
        //init timer

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
        console.log(songs[0]);
        console.log(audio);
        this.setState({ nbSong: this.state.nbSong + 1 });
        if(!this.state.playing){
            audio.play();
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
        let {songList} = this.props;
        if(songList[0].id === index){
            this.setState({currentCount: 30});
            this.state.audio.pause();
            this.updateSongList(songList, songList[0].id);
            this.setState({scoring: this.state.scoring + 1});
            this.setState({rightPopin: true});
            this.playFX('fadeIn');
            setTimeout(() => {
                this.setState({rightPopin: false});
            },2000)
        }else{
            this.setState({wrongPopin: true});
            this.playFX(null,cover);
            setTimeout(() => {
                this.setState({wrongPopin: false});
            },2000)

        }
    }

    render() {
        return (
            <div className="playground">
                <Popins type={this.state.popType} covers={this.state.covers}/>
                <Header
                    timer={this.state.currentCount}
                    score={this.state.scoring}
                    songLeft={this.state.nbSong}
                    totalSongs={this.state.covers.length}
                />
                <div className="covers-grid">
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
                </div>
            </div>
        );
    }
}
function mapStateToProps(state){
    const {counter, launch, songs} = state;
    return {
        songList: songs,
        counter,
        launch
    }
}
export default connect(mapStateToProps, {shuffleTracks, addCompletedSong, launchAction})(Covers);
