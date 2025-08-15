import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login.tsx'
import Home from './pages/Home.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { PrivateRoute } from './components/PrivateRoute.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <Routes>

          {/* ログイン画面 */}
          <Route path='/' element={<Login />} />

          {/* privaterouteでログイン後の画面として制御する*/}
          <Route path='/Home' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>} />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
