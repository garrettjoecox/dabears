import Link from 'next/link';
import tracksSource from '../../public/tracks.json';

export async function getStaticProps() {
  return {
    props: {
      tracks: tracksSource,
    },
  };
}

type HomeProps = {
  tracks: typeof tracksSource;
};

export default function Home({ tracks }: HomeProps) {
  return (
    <div>
      Hello World {tracks.length}
      {tracks.map((track) => (
        <div key={track.id}>
          <Link href={`/${track.id}`}>
            <a>{track.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
}
