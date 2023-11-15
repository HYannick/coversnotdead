export default function CoverCard({cover, onClick}: any) {
  return (
    <div className="cover" onClick={(e) => onClick(cover.id, e.target)}>
      <div className="infos">
        <p className="artist">{cover.artist}</p>
      </div>
      <img src={cover.picture} alt={cover.artist} />
    </div>
  )
}