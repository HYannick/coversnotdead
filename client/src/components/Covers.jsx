import React, { Component } from 'react';
import {connect} from 'react-redux';
import {shuffleTracks, addCompletedSong, decrementCounter} from '../actions/index';
import '../style.css';
import anime from 'animejs';

class Covers extends Component {
    constructor(props){
        super(props);
        this.state = {
            covers : [],
            counter: 10,
            playing : false,
            audio: null
        }
    }

    componentWillReceiveProps(nextProps){
        let {songs} = nextProps.songList;
        this.playTrack(songs);
    }

    componentDidMount(){
        const BASE_URL = '/songs.json';
        fetch(BASE_URL, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({covers: json}, () => {
                    this.props.shuffleTracks(this.state.covers);
                });
            })
    }



    playTrack(newSongs){
        let songs = newSongs;
        let audio = new Audio(songs[0].track);
        console.log(songs[0]);
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
        let {songs} = this.props.songList;
        if(songs[0].id === index){
            this.state.audio.pause();
            this.updateSongList(songs, index);
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
                targets : cover,
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
            //TODO create a nice popup !
            alert('wrong song ! Try again !');

        }
    }

    updateSongList(songs, index){
        this.props.shuffleTracks(songs);
        this.props.addCompletedSong(songs, index);
    }

    render() {
        return (
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
        );
    }
}
function mapStateToProps(state){
    const {counter} = state;
    return {
        songList: state,
        counter
    }
}
export default connect(mapStateToProps, {shuffleTracks, addCompletedSong, decrementCounter})(Covers);
