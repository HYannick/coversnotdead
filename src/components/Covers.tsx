import {useCallback, useContext, useEffect, useState} from 'react';
import Header from './Header';
import Modal from './Modal';
import anime from 'animejs'
import {Cover} from '../domain/Cover.ts';
import {SongContext} from './SongContext.tsx';
import CoverCard from './Cover.tsx';
import CreditsCard from './CreditsCard.tsx';
import LogoCard from './LogoCard.tsx';
import songs from '../secondary/songs.json'

const TIMER_DURATION = 30;

export enum ModalType {
  IDLE = '',
  RIGHT = 'right',
  WRONG = 'wrong',
  FINAL = 'final',
  NEXT = 'next',
}

export default function Covers() {
  const {
    shuffleCovers,
    initCovers,
    covers,
    coverList,
    addCompletedCover,
    currentCover,
    setCurrentCover
  } = useContext(SongContext);

  const [currentCount, setCurrentCount] = useState(TIMER_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [numberOfSongsPlayed, setNumberOfSongsPlayed] = useState(0);

  const [modalType, setModalType] = useState<ModalType>(ModalType.IDLE);
  const [timerId, setTimerId] = useState<any>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const covers = songs as unknown;
    initCovers(covers as Cover[]);
  }, []);

  useEffect(() => {
    if (currentCount === 0 && currentCover) {
      triggerEndOfRound();
    }
  }, [currentCount, currentCover]);

  useEffect(() => {
    if (gameStarted && coverList.length === 0) {
      concludeGame();
    }
    setCurrentCover(coverList[0]);
  }, [coverList, gameStarted]);

  useEffect(() => {
    if (gameStarted && currentCover) {
      playTrack(currentCover);
    }
  }, [currentCover]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    startTimer();
    setCurrentCover(coverList[0]);
    playTrack(coverList[0]);
  }, [coverList]);

  const applyAnimation = (effect: string | null, el?: HTMLElement) => {
    if (effect === 'fadeIn') {
      anime({
        targets: document.getElementsByClassName('cover'),
        opacity: 1,
        scale: 1,
        borderRadius: 0,
        duration: 400,
        easing: 'easeOutSine'
      });

    } else {
      anime({
        targets: el,
        borderRadius: {
          value: "50%",
          duration: 800,
          easing: 'easeInOutSine'
        },
        opacity: 0,
        scale: 0,
        duration: 800,
        easing: 'easeInOutSine'
      });
    }
  };

  const triggerEndOfRound = () => {
    setNumberOfSongsPlayed(prev => prev + 1);
    applyAnimation('fadeIn');
    setCurrentCount(TIMER_DURATION);
    setModalType(ModalType.NEXT);
    audio?.pause();
    updateCoverList(coverList[0].id);
    playTrack(currentCover!);
    if (coverList.length !== 1) {
      resetModalTypeAfterDelay();
    }
  };


  const concludeGame = () => {
    setModalType(ModalType.FINAL);
    audio?.pause();
    if (timerId) clearInterval(timerId);
  };

  const resetModalTypeAfterDelay = () => {
    setTimeout(() => setModalType(ModalType.IDLE), 1000);
  };

  const startTimer = useCallback(() => {
    const id = setInterval(() => {
      setCurrentCount(count => count - 1);
    }, 1000);
    setTimerId(id);
  }, []);

  const updateCoverList = (coverId: string) => {
    shuffleCovers();
    addCompletedCover(coverId);
  };

  const playTrack = (cover: Cover) => {
    const newAudio = new Audio(cover.track);
    if (!isPlaying) {
      newAudio.addEventListener('loadedmetadata', () => {
        newAudio.play();
      });
    } else {
      audio?.pause();
      newAudio.play();
    }

    setIsPlaying(true);
    setAudio(newAudio);
  };

  const handleCorrectGuess = () => {
    setCurrentCount(TIMER_DURATION)
    setScore(score + 1)
    setModalType(ModalType.RIGHT)
    audio!.pause();
    updateCoverList(coverList[0].id);
    applyAnimation('fadeIn');
    if (coverList.length !== 1) {
      resetModalTypeAfterDelay();
    }
  }

  const handleIncorrectGuess = (coverElement: HTMLElement) => {
    setModalType(ModalType.WRONG);
    applyAnimation(null, coverElement);
    resetModalTypeAfterDelay();
  };
  const matchTracks = (index: string, ctx: any) => {
    const cover = ctx.parentNode;
    if (coverList[0].id === index && currentCover) {
      handleCorrectGuess();
    } else {
      handleIncorrectGuess(cover)
    }
  };

  return (
    <div className="playground">
      <Modal
        type={modalType}
        timer={TIMER_DURATION}
        covers={covers}
        score={score}
        totalScore={covers.length}
        currentCover={currentCover}
        onInit={startGame}
      />
      <Header
        timer={currentCount}
        score={score}
        songLeft={numberOfSongsPlayed}
        totalSongs={covers.length}
        totalScore={covers.length}
      />
      <div className="covers-grid">
        <LogoCard/>
        {covers.map((cover) => (<CoverCard key={cover.id} cover={cover} onClick={matchTracks}/>))}
        <CreditsCard/>
      </div>
    </div>
  );
}
