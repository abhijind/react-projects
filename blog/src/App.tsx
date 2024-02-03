import { useEffect, useState } from 'react';
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth.service';
import { login, logout } from './store/auth.slice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => (setLoading(false)))

  });

  return !loading ? ( 
    <div className='min-h-screen flex flex-col bg-gray-200 w-full'>
      <Header />
      <main className='h-full flex-1 overflow-y-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default App
