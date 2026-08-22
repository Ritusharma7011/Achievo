import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducer/index"

const store = configureStore({
  reducer : rootReducer
})

createRoot(document.getElementById('root')).render(
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <App/> 
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#161923",
              color: "#fff",
              border: "1px solid #6D4AFF",
            },
            success: {
              iconTheme: {
                primary: "#7C4DFF",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ff4d6d",
                secondary: "#fff",
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
    
    
  </div>
    
)
