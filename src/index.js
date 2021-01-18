//Libs
import React from 'react';
import ReactDOM from 'react-dom';

//Components
import App from './App'
import Context from './Context'


ReactDOM.render(
  <Context.Provider >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
  document.getElementById('root')
);