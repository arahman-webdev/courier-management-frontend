import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './routes/router'
import { ThemeProvider } from './providers/theme-provider'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}>
        </RouterProvider>
         <Toaster richColors />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
)
