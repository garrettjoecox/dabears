import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import tracksSource from '../../public/tracks.json';

export const getStaticProps: GetStaticProps<TrackProps, { trackId: string }> = async (context) => {
  const track = tracksSource.find((t) => t.id === context.params?.trackId);

  if (!track) return { notFound: true };

  return {
    props: {
      track,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: tracksSource.map((t) => ({
      params: { trackId: t.id },
    })),
    fallback: false,
  };
};

type TrackProps = {
  track: typeof tracksSource[number];
};

export default function Track({ track }: TrackProps) {
  const router = useRouter();
  const { trackId } = router.query;

  return (
    <p>
      Track ID: {trackId} {track.title}
    </p>
  );
}
