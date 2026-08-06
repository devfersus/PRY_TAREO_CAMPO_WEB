import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './shared/theme/theme'
import DrawerDemo from './pages/main/drawer_demo/DrawerDemo.tsx'
import { ErrorBoundary } from './shared/ErrorBoundary.tsx'
import { LoginPage } from './pages/Seguridad/Auth/Pages/LoginPage.tsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem('token')
  );

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <DrawerDemo
      onLogout={() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary fallback={<div>Ha ocurrido un error inesperado.</div>}>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>,
)
