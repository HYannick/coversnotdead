import songs from '../secondary/db/songs.json'
import {Cover} from '../domain/Cover.ts';
export default function CoverResource() {
  const getCoverData = (): Cover[]  => {
    return songs as Cover[];
  }

  return {getCoverData};
}