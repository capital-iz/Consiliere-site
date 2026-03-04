import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './ConsiliereApp';

const appNode = document.getElementById('app');

if (appNode) {
    createRoot(appNode).render(<App />);
}
