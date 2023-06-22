import { Box } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tracksSource from '../../../public/tracks.json';
import { AppDispatch, AppState } from '../state';
import { nextTrack, pause, play, prevTrack } from '../state/playerSlice';

type PlayerProps = {};

const Player: FC<PlayerProps> = () => {
  const activeTrackIndex = useSelector((state: AppState) => state.player.track);
  const playbackState = useSelector((state: AppState) => state.player.playbackState);
  const dispatch = useDispatch<AppDispatch>();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let track = tracksSource[activeTrackIndex];

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: 'dabears',
      album: track.tags.join(', '),
      artwork: [
        { src: `/img/${track.id}.jpg`, sizes: '96x96', type: 'image/png' },
        { src: `/img/${track.id}.jpg`, sizes: '128x128', type: 'image/png' },
        { src: `/img/${track.id}.jpg`, sizes: '192x192', type: 'image/png' },
        { src: `/img/${track.id}.jpg`, sizes: '256x256', type: 'image/png' },
        { src: `/img/${track.id}.jpg`, sizes: '384x384', type: 'image/png' },
        { src: `/img/${track.id}.jpg`, sizes: '512x512', type: 'image/png' },
      ],
    });
    if (audioRef.current) {
      audioRef.current.src = `https://dabears.s3.amazonaws.com/${tracksSource[activeTrackIndex].id}.mp3`;
    }
  }, [audioRef, activeTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (playbackState === 'playing') {
        navigator.mediaSession.playbackState = 'playing';
        audioRef.current
          .play()
          .then(() => {
            navigator.mediaSession.setPositionState({
              duration: audioRef.current?.duration,
              playbackRate: audioRef.current?.playbackRate,
              position: audioRef.current?.currentTime,
            });
          })
          .catch((error) => console.log(error));
      } else {
        navigator.mediaSession.playbackState = 'paused';
        audioRef.current.pause();
      }
    }
  }, [playbackState, activeTrackIndex]);

  const playHandler = useCallback(() => dispatch(play()), [dispatch]);
  const pauseHandler = useCallback(() => dispatch(pause()), [dispatch]);
  const nextTrackHandler = useCallback(() => dispatch(nextTrack()), [dispatch]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('play', playHandler);
      audioRef.current.addEventListener('pause', pauseHandler);
      audioRef.current.addEventListener('ended', nextTrackHandler);
      navigator.mediaSession.setActionHandler('play', () => playHandler);
      navigator.mediaSession.setActionHandler('pause', () => pauseHandler);
      navigator.mediaSession.setActionHandler('nexttrack', nextTrackHandler);
      navigator.mediaSession.setActionHandler('previoustrack', () => dispatch(prevTrack()));
      navigator.mediaSession.setActionHandler('seekto', (event) => {
        if (event.fastSeek && 'fastSeek' in audioRef.current!) {
          audioRef.current.fastSeek(event.seekTime!);
          return;
        }
        audioRef.current!.currentTime = event.seekTime!;
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', playHandler);
        audioRef.current.removeEventListener('pause', pauseHandler);
        audioRef.current.removeEventListener('ended', nextTrackHandler);
      }
    };
  }, [dispatch, nextTrackHandler, pauseHandler, playHandler]);

  return (
    <Box w="100%" position="fixed" bottom="env(safe-area-inset-bottom)" bg="gray.900">
      <audio ref={audioRef} controls style={{ width: '100%' }}>
        Your browser does not support the audio element.
      </audio>
    </Box>
  );
};

export default Player;
