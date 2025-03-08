import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { MealsProvider } from './contexts/meals-context'
import './index.css'
import { queryClient } from './lib/react-query'

import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MealsProvider>
          <App />
        </MealsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
