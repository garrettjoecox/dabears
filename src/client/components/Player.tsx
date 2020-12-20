import { Box } from '@chakra-ui/react';
import { PlayerContext, setAudioApi } from 'client/state/PlayerContext';
import React, { FC, useContext, useEffect, useRef } from 'react';

type PlayerProps = {};

const Player: FC<PlayerProps> = () => {
  const { state, dispatch } = useContext(PlayerContext);
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      dispatch(setAudioApi(audioRef.current));
    }
  }, [dispatch]);

  return (
    <Box w="100%" position="fixed" bottom="0" bg="gray.900">
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} controls preload="none" style={{ width: '100%' }}>
        {state.track && <source src={`https://dabears.s3.amazonaws.com/${state.track.id}.mp3`} type="audio/mp3" />}
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default Player;
