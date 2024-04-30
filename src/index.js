import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/scss/black-dashboard-react.scss"
import 'react-quill/dist/quill.snow.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

