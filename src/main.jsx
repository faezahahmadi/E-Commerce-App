import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from './context/ThemeContext.jsx';
import { Provider } from 'react-redux';
import { store } from "./features/store.js";

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeContextProvider>
        <Provider store={store}>
          <StrictMode>
            <App />
          </StrictMode>

        </Provider>

      </ThemeContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
  ,
)
