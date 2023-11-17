import logo from '../../../assets/img/logo.gif'

type HeaderProps = {
  timer: number,
  score: number,
  songLeft: number,
  totalScore: number,
  totalSongs: number
}
export default function Header({timer, score, songLeft, totalScore, totalSongs}: HeaderProps) {
  return (
    <div className="head-cover">
      <div className="item logo">
        <img width="100%" src={logo} alt="logo"/>
      </div>
      <div className="item instructions">
        <h3>Find in <span className="counter">{timer}</span> seconds the right cover to the song.</h3>
        <h4>Don't forget to activate your headphones!</h4>
      </div>
      <div className="item score">
        <p className="nb-points">Score : {score}/{totalScore}</p>
        <p className="nb-songs">Songs : {songLeft}/{totalSongs}</p>
      </div>
    </div>
  );
}
