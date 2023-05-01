import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from './client';
import { ApolloProvider } from '@apollo/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //ApolloProvider로 감싸면 그 안의 컴포넌트에서 얼마든지 client를 이용할 수 있다. 컴포넌트 내에서 useApolloClient를 호출하면 끝.
  
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  
);