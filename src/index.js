import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LockProvider } from './context/LockContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LockProvider childeren={
  <React.StrictMode>
    <App />
  </React.StrictMode>}
  />
);

reportWebVitals();
