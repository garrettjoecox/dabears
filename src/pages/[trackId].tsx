import { ChevronLeftIcon, TimeIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
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
  const displayTimestamp = useBreakpointValue({ base: false, md: true });

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
      <Container maxW="80ch" mb="4">
        <Box py="4">
          <Link href="/" scroll={false} passHref>
            <Button as="a" aria-label="back" leftIcon={<ChevronLeftIcon boxSize="5" />} variant="ghost">
              Mixes
            </Button>
          </Link>
        </Box>
        <Flex direction={['column', 'column', 'row']} alignItems={['center', 'center', 'end']}>
          <Image src={`/img/${track.id}.jpg`} height="187" width="240" />
          <Box textAlign={['center', 'center', 'initial']} marginLeft={['0', '0', '4']}>
            <Heading>{track.title}</Heading>
            <Text>{track.tags}</Text>
            <Text color="gray.500">
              {new Date(track.date).getFullYear()} &#8226; {track.tracklist.length} songs, 46 min
            </Text>
            <Button onClick={() => dispatch(setTrack(track))} variant="solid" colorScheme="blue" px="10" mt="2">
              Play
            </Button>
          </Box>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Artist</Th>
              {displayTimestamp && (
                <Th isNumeric>
                  <TimeIcon />
                </Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {track.tracklist.map((song) => (
              <Tr key={song.title}>
                <Td dangerouslySetInnerHTML={{ __html: song.title! }} isTruncated maxW="20vw" />
                <Td dangerouslySetInnerHTML={{ __html: song.artist! }} isTruncated maxW="10vw" />
                {displayTimestamp && <Td isNumeric>3:40</Td>}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
}
