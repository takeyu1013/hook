import React, { useContext, useEffect, useRef, useState } from 'react';
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

type Position = {
  x: number,
  y: number
};

type CatProps = {
  mouse: Position
};

const Cat = (props: CatProps) => {
  const mouse = props.mouse;
  return (
    <img src="https://developer.mozilla.org/static/img/favicon144.png" alt="mouse" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
  );
};

type MouseProps = {
  render(state: Position): React.ReactNode,
};

const Mouse = (props: MouseProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };
  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      {props.render(position)}
    </div>
  );
};

const MouseTracker = () => {
  return (
    <div>
      <h1>Move the mouse around!</h1>
      <Mouse render={(mouse: any) => (
        <Cat mouse={mouse} />
      )} />
    </div>
  );
};

const CommonList = () => {
  const [comments, setComments] = useState([{ id: 0, value: 'comment' }]);

  const handleChange = () => {
    setComments([...comments, { id: comments.length, value: 'changed comment' }]);
  };

  return (
    <div>
      <button onClick={handleChange}>add comment</button>
      <ul>
        {comments.map((comment: { id: number, value: string }) => (
          <li>{comment.value}(id: {comment.id})</li>
        ))}
      </ul>
    </div>
  );
};

// const logProps = (WrappedComponent: any) => {
//   return () => {
//     type Props = {};
//     useEffect((prevProps?: Props) => {
//       console.log(prevProps);
//       console.log();
//     });
//     return (
//       <WrappedComponent />
//     );
//   };
// };

type ModalProps = {
  children: string
};

const Modal: React.FC<ModalProps> = (props) => {
  const element = document.createElement('div');
  return ReactDOM.createPortal(props.children, element);
};

const App = () => {
  return (
    <div>
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
      <TextInputWithFocusButton />
      <MouseTracker />
      <CommonList />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

import('./math').then(math => {
  console.log(math.add(16, 23));
});