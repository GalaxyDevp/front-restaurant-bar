import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navbar from './components/Navbar'
import ShowThreeColumns from './components/ShowThreeColumns';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Navbar />
  <ShowThreeColumns />
  </>
);

