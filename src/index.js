import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/scss/black-dashboard-react.scss"
import 'react-quill/dist/quill.snow.css';
import {persistor, store} from "./dev/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
    <App />
          </PersistGate>
      </Provider>
  </React.StrictMode>
);

