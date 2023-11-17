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
                    <p>The artist is : <span className="highlighted-song">{currentCover && currentCover.artist}</span></p>
                    <p>Here is your score : <span className="highlighted-song">{score}/{totalScore}</span></p>
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

    const getEndSentence = (score: number, totalScore: number) => {
        const tiers = totalScore / 3;
        if (score <= tiers) {
            return <p className="end-sentence">Well, you have got some marge buddy!</p>;
        } else if (score <= tiers * 2) {
            return <p className="end-sentence">Well, you are on the good road!</p>;
        } else if (score <= totalScore) {
            return <p className="end-sentence">Well, you are really a rockstar! Congratulations!</p>;
        }
        return '';
    };

    const results = () => {
        const endSentence: string | ReactElement = getEndSentence(score, totalScore);
        return(
            <div className="final-pop popin">
                <div className="pop-content">
                    <h3>Well done !</h3>
                    {endSentence}
                    <p>Here your final score</p>
                    <p className="final-score">{score}/{totalScore}</p>
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
