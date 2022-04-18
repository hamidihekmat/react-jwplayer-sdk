import React, { createContext, useContext, useEffect, useState } from 'react';
import { JWPlayerSDKReadyProvider } from './jwplayerSDKReady';
import { JWPlayerProvider } from './jwplayer';
import { MUST_BE_WRAPPED_MESSAGE } from './constants';

const useScript = (src: string) => {
  const [scriptRef, setScriptRef] = useState<HTMLScriptElement | null>(null);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;

    document.body.appendChild(script);
    setScriptRef(script);
    return () => {
      document.removeChild(script);
      setScriptRef(null);
    };
  }, [src]);

  return scriptRef;
};

const JWPlayerSDKContext = createContext<
  ReturnType<typeof useScript> | null | undefined
>(undefined);

export type JWPlayerSDKProps = {
  playerId: string;
  playlist: string;
  playerScript: string;
  children?: React.ReactElement | React.ReactElement[];
};
export const JWPlayerSDK: React.FC<JWPlayerSDKProps> = ({
  playerId,
  playerScript,
  playlist,
  children,
}) => {
  const scriptRef = useScript(playerScript);

  return (
    <JWPlayerSDKContext.Provider value={scriptRef}>
      <JWPlayerSDKReadyProvider>
        <div id={playerId}></div>
        <JWPlayerProvider playlist={playlist} playerId={playerId}>
          {children}
        </JWPlayerProvider>
      </JWPlayerSDKReadyProvider>
    </JWPlayerSDKContext.Provider>
  );
};

export const useJWPlayerScript = () => {
  const scriptRef = useContext(JWPlayerSDKContext);
  if (scriptRef === undefined) throw new Error(MUST_BE_WRAPPED_MESSAGE);

  return scriptRef;
};
