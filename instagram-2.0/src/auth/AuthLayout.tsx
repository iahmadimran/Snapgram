import { useAuthContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

function AuthLayout() {
  const isAuthenticated = false


  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) :
        <>
          <section className='flex flex-col flex-1 justify-center items-center py-10'>
            <Outlet />
          </section>

          <img src='/assets/images/side-img.svg' alt='logo' className='hidden xl:block w-1/2 object-cover bg-no-repeat' />
        </>
      }
    </>
  )
}

export default AuthLayout
