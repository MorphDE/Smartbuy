import './App.css'
import { useState } from 'react'
import Loadingscreen from './components/Loadingscreen/Loadingscreen'
import { LoadingContext } from './context/LoadingContext';
import { AuthProvider } from './context/AuthContext'
import "@fontsource/poppins";
import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify';

function App() {

  const [isLoading, setLoading] = useState(false);

  return (
    <section>
      <ToastContainer/>
      <AuthProvider>
        <LoadingContext.Provider value={{ isLoading, setLoading }}>
            {isLoading ? (
              <AppRoutes/>
            ) : (
              <Loadingscreen />
            )}
        </LoadingContext.Provider>
      </AuthProvider>
    </section>
  )
}

export default App
