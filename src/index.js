import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from './store/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
    <StoreProvider>
        <App />
    </StoreProvider>
    </StrictMode>
);


