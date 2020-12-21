import { Box } from '@chakra-ui/react';
import { AppDispatch, AppState } from 'client/state';
import { setAudioApi } from 'client/state/playerSlice';
import React, { FC, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type PlayerProps = {};

const Player: FC<PlayerProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTrack = useSelector((state: AppState) => state.player.track);
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
        {activeTrack && <source src={`https://dabears.s3.amazonaws.com/${activeTrack.id}.mp3`} type="audio/mp3" />}
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default Player;
