import Covers from '../primary/components/covers/Covers.tsx';
import SongProvider from '../primary/contexts/SongContext.tsx';

export default function Layout() {
  return (
    <SongProvider>
      <Covers />
    </SongProvider>
  )
}
