import { NavLink } from 'react-router-dom'
import { whichLang } from '../../constants/_language'

const Header = ({ searchFilm }) => {
  const NavLinkClass = ({ isActive, isPending }) => {
    return isPending ? '' : isActive ? 'underline' : ''
  }
  return (
    <header className='w-full flex items-center justify-center pr-10 pl-10 h-[80px] md:gap-[5px] bg-gradient-to-b from-zinc-950 to-[rgb(26,26,26)] font-["Inter"]'>
      <div>
        <nav className='flex items-center gap-20'>
          <div className='md:flex hidden text-white font-[600]  gap-5'>
            <NavLink to='/' className={NavLinkClass}>
              Home
            </NavLink>
            <NavLink to='/likes' className={NavLinkClass}>
              Likes
            </NavLink>
          </div>
          <form onSubmit={searchFilm}>
            <input
              className='w-[300px] md:w-[500px] h-8 text-xl pl-3 bg-[#303030] rounded outline-none text-white'
              type='text'
              placeholder={whichLang() ? 'поиск' : 'search'}
            />
          </form>
        </nav>
      </div>
    </header>
  )
}

export default Header
