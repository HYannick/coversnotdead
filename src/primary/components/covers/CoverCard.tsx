import {Cover} from '../../../domain/Cover.ts';

type CoverCardProps = {
  cover: Cover,
  onClick: (coverId: string, e: EventTarget) => void
}
export default function CoverCard({cover, onClick}: CoverCardProps) {
  return (
    <div className="cover" onClick={(e) => onClick(cover.id, e.target)}>
      <div className="infos">
        <p className="artist">{cover.artist}</p>
      </div>
      <img src={cover.picture} alt={cover.artist}/>
    </div>
  )
}