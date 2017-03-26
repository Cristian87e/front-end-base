import React from 'react';
import ReactDOM from 'react-dom';

import './app.css';
import Button from './components/Button/Simple';

const click = () => ('Presionado');

ReactDOM.render(
  <h1>Hello React! <Button onPress={click}>Boton Ejemplo</Button></h1>,
  document.getElementById('root'),
);
