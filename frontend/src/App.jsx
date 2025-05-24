import { Toaster } from 'react-hot-toast'
import './App.css'
import FloatingShape from './components/FloatingShape'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSoinner'
import { useLocation } from 'react-router-dom'


function App() {
  const location = useLocation()
  const { checkAuth, isCheckingAuth, clearError } = useAuthStore()

  useEffect(() => {
      checkAuth()
  }, [ checkAuth ])

  useEffect(() => {
    clearError()
  }, [location.pathname])

  if(isCheckingAuth) return <LoadingSpinner/>
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden px-3'>
      <FloatingShape color="bg-green-500" size= "w-64 h-64" top="-5%" left="10%" delay={0}/>
      <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
      <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
      <AppRoutes/>
      <Toaster/>
    </div>
  )
}

export default App
