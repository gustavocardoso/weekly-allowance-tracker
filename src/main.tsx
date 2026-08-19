import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppProvider } from '@/contexts/AppContext';
import { ToastProvider } from '@/contexts/ToastContext';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AppProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
