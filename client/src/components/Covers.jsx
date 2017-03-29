import React, { Component } from 'react';
import {connect} from 'react-redux';
import {shuffleTracks} from '../actions/index';
import '../style.css';

class Covers extends Component {
    constructor(props){
        super(props);
        this.state = {
            covers : [],
            completedCovers: [],
            counter: 30,
            playing : false,
            audio: null,
            coverPlayed : ''
        }
    }

    componentDidMount(){
        const BASE_URL = '/songs.json';
        fetch(BASE_URL, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({covers: json});
                this.props.shuffleTracks(this.state.covers);
                this.playTrack();
            })
    }

    playTrack(){
        let {songs} = this.props.songList;
        console.log(songs[0]);
        let audio = new Audio(songs[0].track);
        audio.play();
        if(!this.state.playing){
            audio.play();
            this.setState({
                playing: true,
                coverPlayed : songs[0].track,
                audio
            });
        }else{
            this.state.audio.pause();
            audio.play();
            this.setState({
                playing: true,
                playingUrl: songs[0].track, audio
            })
        }
    }

    matchTracks(id){
        let {songs} = this.props.songList;

        if(songs[0].id === id){
            this.state.audio.pause();
            this.props.shuffleTracks(songs);
            this.playTrack();
        }
    }


    render() {
        let {songs} = this.props.songList;
        console.log(songs[0]);
        return (
            <div className="covers-grid">
                {
                    this.state.covers.map((cover) => {
                        return (
                            <div className="cover" key={cover.id} onClick={() => this.matchTracks(cover.id)}>
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
    return {
        songList: state
    }
}
export default connect(mapStateToProps, {shuffleTracks})(Covers);
