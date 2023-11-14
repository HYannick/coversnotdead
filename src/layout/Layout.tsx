import Covers from '../components/Covers.tsx';
import SongProvider from '../components/SongContext.tsx';

export default function Layout() {
  return (
    <SongProvider>
      <Covers />
    </SongProvider>
  )
}
