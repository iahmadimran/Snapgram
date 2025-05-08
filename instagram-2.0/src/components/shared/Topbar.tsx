import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useAuthContext } from '@/context/AuthContext'
import { useSignOutAccount } from '@/lib/react-query/queries'
import { useEffect } from 'react'

function Topbar() {
  const {user} = useAuthContext()
  const navigate = useNavigate()
  const {mutate: signOut, isSuccess} = useSignOutAccount()

  useEffect(() => {
    if (isSuccess) navigate("/sign-in") 
  }, [isSuccess])

  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to={"/"} className="flex gap-3 items-center">
          <img 
          src='/assets/images/logo.svg'
          height={325}
          width={130} />
        </Link>

        <div className='flex gap-4'>
          <Button variant='ghost' 
           className='shad-button_ghost cursor-pointer'
           onClick={() => signOut()} >
            <img src='/assets/icons/logout.svg' alt='logout' />
          </Button>
          
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
          <img src={user.imageUrl || "/assets/icons/profle-placeholder.svg"} alt='profile' className='h-8 w-8 rounded-full' /></Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar
