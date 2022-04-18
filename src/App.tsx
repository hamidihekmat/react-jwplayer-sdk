import { useState } from 'react';
import { useJWPlayer } from './sdk/jwplayer';
import { JWPlayerSDK } from './sdk/jwplayerSDK';

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <JWPlayerSDK
        playerId="player"
        playerScript="https://cdn.jwplayer.com/libraries/EM0EvxdG.js"
        playlist="https://cdn.jwplayer.com/v2/media/gaCRFWjn"
      >
        <MyPlayer />
      </JWPlayerSDK>
      <h1>{counter}</h1>
      <button onClick={() => setCounter((prev) => prev + 1)}>Toggle</button>
    </div>
  );
}

const MyPlayer = () => {
  const jwplayer = useJWPlayer();

  if (!jwplayer) return <div>Loading....</div>;

  return (
    <div>
      <p>JWPlayer Loaded...</p>
      <button onClick={() => jwplayer.play()}>Play</button>
      <button onClick={() => console.log(jwplayer.getState())}>
        Get State
      </button>
    </div>
  );
};

export default App;
