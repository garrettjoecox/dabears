import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Button, Container, Heading, IconButton, Text } from '@chakra-ui/react';
import { AppDispatch } from 'client/state';
import { setTrack } from 'client/state/playerSlice';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Head>
        <meta property="og:title" content={track.title} />
        <meta property="og:description" content={track.description} />
        <meta property="og:type" content="music.song" />
        <meta property="og:url" content={`https://dabears.garrettcox.dev/${track.id}`} />
        <meta property="og:image" content={`https://dabears.garrettcox.dev/img/${track.id}.jpg`} />
        <meta property="og:audio" content={`https://dabears.s3.amazonaws.com/${track.id}.mp3`} />
        <meta property="og:audio:secure_url" content={`https://dabears.s3.amazonaws.com/${track.id}.mp3`} />
        <meta property="og:audio:type" content="audio/mpeg" />
      </Head>
      <Container maxW="80ch">
        <Link href="/" scroll={false} passHref>
          <IconButton as="a" aria-label="back" variant="ghost" icon={<ChevronLeftIcon boxSize="9" />} />
        </Link>
        <Image src={`/img/${track.id}.jpg`} height="187" width="240" />
        <Heading>{track.title}</Heading>
        <Text>{track.description}</Text>
        <Button onClick={() => dispatch(setTrack(track))}>Play</Button>
      </Container>
    </>
  );
}
