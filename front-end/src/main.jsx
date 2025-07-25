
import React from 'react'; // Core React library
import ReactDOM from 'react-dom/client'; // For creating root in modern React
import App from '@/App'; // Main App component
import '@/index.css'; // Global styles

// Mount App to #root element in public/index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
