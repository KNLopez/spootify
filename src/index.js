import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
