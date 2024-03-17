import { NavLink, useParams } from "react-router-dom";

const FooterNav = () => {
    const {keyword} = useParams()
    const navToInput = ()=>{
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
    }
    return (
        <nav className='fixed w-[100%] bottom-0 p-[10px] bg-neutral-950 text-[whitesmoke] flex items-center justify-between'>
            <NavLink to={-1}>
            <img className="w-[25px]" src="https://cdn2.iconfinder.com/data/icons/50-material-design-round-corner-style/44/Back-512.png" alt="error" />
            </NavLink>
            <img onClick={keyword && navToInput} className="w-[30px]" src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/7914114/search-icon-sm.png" alt="error" />
            <NavLink to={'/'}>
            <img className="w-[30px] h-[25px]" src="https://cdn-icons-png.freepik.com/512/8367/8367621.png" alt="error" />
            </NavLink>
        </nav>
    );
};

export default FooterNav;