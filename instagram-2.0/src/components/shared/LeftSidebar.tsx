import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { useEffect } from 'react'
import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'

function LeftSidebar() {
  const { pathname } = useLocation()

  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { mutate: signOut, isSuccess } = useSignOutAccount()

  useEffect(() => {
    if (isSuccess) navigate("/sign-in")
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-6'>
        <Link to={"/"} className="flex gap-3 items-center">
          <img
            src='/assets/images/logo.svg'
            height={30}
            width={150} />
        </Link>

        <div className=''></div>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profle-placeholder.svg"}
            className='h-10 w-10 rounded-full'
            alt='profile' />
          <div className='flex flex-col'>
            <p className='font-semibold text-md'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>

        <ul className='className="flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (

              <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-primary-500"
                }`}>
                <NavLink to={link.route} className="flex gap-3 mb-1.5 items-center px-4 py-3">
                  <img src={link.imgURL} alt={link.label} className={`group-hover:brightness-0 transition ${
                      isActive && "invert-white"
                    }`} width={20} height={20} />
                  <p>{link.label}</p>
                </NavLink>

              </li>
            )
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost flex justify-start items-start"
        onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>

    </nav>
  )
}

export default LeftSidebar
