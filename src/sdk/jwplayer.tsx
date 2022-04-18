import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';
import { MUST_BE_WRAPPED_MESSAGE } from './constants';
import { useJWPlayerSDKReady } from './jwplayerSDKReady';

export const JWPlayerContext = createContext<
  ReturnType<typeof window.jwplayer> | null | undefined
>(undefined);

type JWPlayerProps = {
  playerId: string; // unique playerId]
  playlist: string;
  children?: React.ReactElement | React.ReactElement[];
};

export const JWPlayerProvider: React.FC<JWPlayerProps> = ({
  playlist,
  playerId,
  children,
}) => {
  const jwplayerSDKReady = useJWPlayerSDKReady();
  const [player, setPlayer] = useState<ReturnType<
    typeof window.jwplayer
  > | null>(null);

  useLayoutEffect(() => {
    if (jwplayerSDKReady) {
      window.jwplayer('player').setup({
        playlist,
      });

      setPlayer(window.jwplayer());
    }
  }, [playerId, jwplayerSDKReady, playlist]);
  return (
    <JWPlayerContext.Provider value={player}>
      <div id={playerId}></div>
      {children}
    </JWPlayerContext.Provider>
  );
};

export const useJWPlayer = () => {
  const player = useContext(JWPlayerContext);
  if (player === undefined) throw new Error(MUST_BE_WRAPPED_MESSAGE);

  return player;
};
