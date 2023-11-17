import {ReactElement, useState} from 'react';
import {ModalType} from '../covers/Covers.tsx';
import {Cover} from '../../../domain/Cover.ts';

export type ModalProps = {
    currentCover: Cover | null,
    timer: number,
    score: number,
    totalScore: number,
    onInit: (covers: Cover[]) => void;
    covers: Cover[],
    type: ModalType,
    onRetry: () => void;
}
export default function Modal({currentCover, timer, score, totalScore, onInit, covers, type, onRetry}: ModalProps) {
    const [displayPopLaunch, setDisplayPopLaunch] = useState(true)

    const rightAnswerModal = () => {
        return (
            <div className="right-pop popin">
                <div className="pop-content">
                    <p>Yeeeey ! You earned 1 point.</p>
                    <p>The artist is : {currentCover && currentCover.artist}</p>
                    <p>Here is your score : {score}/{totalScore}</p>
                </div>
            </div>
        )
    }

    const wrongAnswerModal = () => {
        return(
            <div className="wrong-pop popin">
                <div className="pop-content">
                    <p>Nop ! Try again !</p>
                </div>
            </div>
        )
    }

    const launcherModal = () => {
        return(
            <div className="launcher-pop popin">
                <div className="pop-content">
                    <h3>Find in <span className="counter">{timer}s</span> seconds the right cover to the song.</h3>
                    <h4>Don't forget to activate your headphones!</h4>
                    <button onClick={launch}>Launch</button>
                </div>
            </div>
        )
    }

    const results = () => {
        let endSentence: string | ReactElement = '';
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
                    <button onClick={onRetry}>Retry</button>
                </div>
            </div>
        )
    }
    const tooSlow = () => {
        return(
            <div className="nextTrack-pop popin">
                <div className="pop-content">
                    <p>Too slow bud' !</p>
                </div>
            </div>
        )
    }

    const launch = () => {
        setDisplayPopLaunch(false);
        onInit(covers);
    }


    const generateModal = () => {
        if (displayPopLaunch) {
            return launcherModal();
        }

        switch (type) {
            case ModalType.RIGHT:
                return rightAnswerModal();
            case ModalType.WRONG:
                return wrongAnswerModal();
            case ModalType.NEXT:
                return tooSlow();
            case ModalType.FINAL:
                return results();
            default:
                return null;
        }
    };

    return (
      <div>
          {generateModal()}
      </div>
    )
}
