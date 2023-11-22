import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './styles/Globalstyle';
import { RecoilRoot } from 'recoil';
import registerServiceWorker from '../src/assets/room/openvidu/registerServiceWorker';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
);

registerServiceWorker();
