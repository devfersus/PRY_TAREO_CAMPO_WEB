import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './shared/theme/theme'
import DrawerDemo from './pages/main/drawer_demo/DrawerDemo.tsx'
import { ErrorBoundary } from './shared/ErrorBoundary.tsx'
import { LoginPage } from './pages/Seguridad/Auth/Pages/LoginPage.tsx'
import { PermisosProvider } from './shared/context/PermisosContext.tsx'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem('token')
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/modulo" replace />
              : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
          }
        />
        <Route
          path="/*"
          element={
            isAuthenticated
              ? <PermisosProvider><DrawerDemo onLogout={handleLogout} /></PermisosProvider>
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
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
