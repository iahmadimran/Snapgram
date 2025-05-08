import { bottombarLinks } from '@/constants'
import { Link, useLocation } from 'react-router-dom';

function Bottombar() {
  const {pathname} = useLocation()
  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link to={link.route} key={link.label} className={`leftsidebar-link group flex-center flex-col gap-1 px-3 py-2 transition ${isActive && "bg-primary-500"
            }`}>
            <img src={link.imgURL} alt={link.label} className={`group-hover:brightness-0 transition  ${isActive && "invert-white"
              }`} width={20} height={20} />
            <p className='text-[13px]'>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default Bottombar
