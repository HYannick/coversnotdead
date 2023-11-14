import _ from 'lodash';
import {createContext, useState} from 'react';
import {Cover} from '../domain/Cover.ts';

export interface Song {
  id: string;
}

type SongState =  {
  covers: Cover[]
  coverList: Cover[];
  currentCover: Cover | null;
  initCovers: (covers: Cover[]) => void;
  setCovers: (covers: Cover[]) => void;
  setCoverList: (covers: Cover[]) => void;
  shuffleCovers: () => void;
  setCurrentCover: (cover: Cover) => void;
  addCompletedCover: (id: string) => void;
}
const defaultSongState = {
  covers: [],
  coverList: [],
  currentCover: null,
  setCurrentCover: () => {},
  initCovers: () => {},
  setCovers: () => {},
  setCoverList: () => {},
  shuffleCovers: () => {},
  addCompletedCover: () => {},
} as SongState
export const SongContext = createContext<SongState>(defaultSongState)


export default function  SongProvider({children}: any) {
  const [currentCover, setCurrentCover] = useState<Cover | null>(null);
  const [covers, setCovers] = useState<Cover[]>([]);
  const [coverList, setCoverList] = useState<Cover[]>([]);

  const initCovers = (covers: Cover[]) => {
    setCoverList(_.shuffle(covers))
    setCovers(_.shuffle(covers))
  }
  const shuffleCovers = () => {
    setCoverList(_.shuffle(coverList));
  }

  const addCompletedCover = (id: string) => {
    setCoverList(coverList.filter(cover => cover.id !== id))
  }
  return (
    <SongContext.Provider value={{
      covers,
      currentCover,
      setCurrentCover,
      coverList,
      initCovers,
      setCoverList,
      setCovers,
      shuffleCovers,
      addCompletedCover}}>
      {children}
    </SongContext.Provider>
  )
}