interface Window {
  jwplayer: JWPlayer;
}

type PlayerState = 'buffering' | 'idle' | 'playing' | 'paused';

type JWPlayer = (playerId?: string) => {
  setup: ({ playlist }: { playlist: string }) => void;
  play: () => void; // Sets the play state of the JW Player. Calling play() while media is playing does nothing.
  pause: () => void; // Pauses playback, changing the state of JW Player from playing to paused. Calling pause() while media is already paused does nothing.
  stop: () => void; // Stops the player, returning it to the idle state.
  getState: () => PlayerState;
  on: (event: string) => void;
};
