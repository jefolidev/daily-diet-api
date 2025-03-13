import { QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'
import { MealsProvider } from './contexts/meals-context'
import './index.css'
import { queryClient } from './lib/react-query'

import { BrowserRouter } from 'react-router'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/auth-context'
import { UsersProvider } from './contexts/users-context-'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UsersProvider>
            <MealsProvider>
              <Toaster />
              <App />
            </MealsProvider>
          </UsersProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
