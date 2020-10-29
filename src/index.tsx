import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
};

const ThemeContext = React.createContext(themes.light);

const Toolbar = () => {
  return (
    <div>
      <ThemeButton />
    </div>
  );
};

const ThemeButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
};

const TextInputWithFocusButton = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    inputEl.current?.focus();
  };
  return (
    <div>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Forcus the input</button>
    </div>
  )
};

const MouseTracker = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const handleMouseMove = (event: React.MouseEvent) => {
    setX(event.clientX);
    setY(event.clientY);
  };
  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      <h1>Move the mouse around!</h1>
      <p>The current mouse position is ({x}, {y})</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
      <TextInputWithFocusButton />
      <MouseTracker />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);