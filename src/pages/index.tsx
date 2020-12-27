import { Box, Button, Center, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { AppDispatch } from 'client/state';
import { setTrack } from 'client/state/playerSlice';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
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
  const dispatch = useDispatch<AppDispatch>();

  const onTrackPlay = useCallback(
    (t: typeof tracksSource[number]) => {
      dispatch(setTrack(t));
    },
    [dispatch]
  );

  return (
    <>
      <Head>
        <meta property="og:title" content="dabears mixes" />
        <meta property="og:description" content="House, Trance, Dubstep, and Trap mixes" />
        <meta property="og:type" content="music.album" />
        <meta property="og:url" content="https://dabears.garrettcox.dev" />
        <meta property="og:image" content="https://dabears.garrettcox.dev/og.png" />
      </Head>
      <Wrap spacing={['4', '4', '8']} p="8" justify="center">
        {tracks.map((track) => (
          <WrapItem key={track.id}>
            <Link href={`/${track.id}`} passHref>
              <Box
                as="a"
                aria-label={track.title}
                role="group"
                w={['175px', '175px', '240px']}
                tabIndex={0}
                outline="none"
              >
                <Box position="relative" h={['136px', '136px', '187px']}>
                  <Image src={`/img/${track.id}.jpg`} height="187px" width="240px" alt={track.title} />
                  <Center
                    bg="blackAlpha.600"
                    transition="all 100ms ease"
                    h="100%"
                    w="100%"
                    position="absolute"
                    top="0"
                    opacity="0"
                    _groupHover={{ opacity: 1 }}
                    _groupFocus={{ opacity: 1, shadow: 'outline' }}
                    _focusWithin={{ opacity: 1 }}
                  >
                    <Button
                      aria-label="play"
                      borderRadius="full"
                      borderWidth="1px"
                      borderColor="white"
                      h="50px"
                      w="50px"
                      bg="blackAlpha.600"
                      transition="all 100ms ease"
                      tabIndex={0}
                      onClick={(event) => {
                        event.preventDefault();
                        onTrackPlay(track);
                      }}
                      _hover={{ height: '55px', width: '55px' }}
                      _focus={{ height: '55px', width: '55px', shadow: 'outline' }}
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="play"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        color="#FFFFFF"
                        width="15px"
                        height="15px"
                      >
                        <path
                          fill="currentColor"
                          d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                        />
                      </svg>
                    </Button>
                  </Center>
                </Box>
                <Heading fontSize="lg" isTruncated>
                  {track.title}
                </Heading>
                <Text color="gray.500">{track.tags}</Text>
              </Box>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
}
