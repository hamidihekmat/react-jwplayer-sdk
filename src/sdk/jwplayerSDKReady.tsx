import React, { createContext, useContext, useEffect, useState } from 'react';
import { MUST_BE_WRAPPED_MESSAGE } from './constants';
import { useJWPlayerScript } from './jwplayerSDK';

export const JWPlayerSDKReadyContext = createContext<boolean | undefined>(
  undefined
);

export type JWPlayerSDKReadyProviderProps = {
  children?: React.ReactElement | React.ReactElement[];
};
export const JWPlayerSDKReadyProvider: React.FC<
  JWPlayerSDKReadyProviderProps
> = ({ children }) => {
  const [jwplayerSDKReady, setJWPlayerSDKReady] = useState(false);
  const scriptRef = useJWPlayerScript();
  useEffect(() => {
    if (scriptRef === null) return;

    scriptRef.onload = () => {
      setJWPlayerSDKReady(true);
    };
  }, [scriptRef]);

  return (
    <JWPlayerSDKReadyContext.Provider value={jwplayerSDKReady}>
      {children}
    </JWPlayerSDKReadyContext.Provider>
  );
};

export const useJWPlayerSDKReady = () => {
  const value = useContext(JWPlayerSDKReadyContext);

  if (value === undefined) throw new Error(MUST_BE_WRAPPED_MESSAGE);

  return value;
};
