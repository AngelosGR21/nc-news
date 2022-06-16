const Hamburger = ({menuOpen, setMenuOpen}) => {

    return <div className='hamburger-container' onClick={() => setMenuOpen((previousState) => !previousState )}>
        <span className={menuOpen ? "hamburger-lines open-menu-top" : "hamburger-lines"}></span>
        <span className={menuOpen ? "hamburger-lines open-menu-middle" : "hamburger-lines"}></span>
        <span className={menuOpen ? "hamburger-lines open-menu-bottom" : "hamburger-lines"}></span>
    </div>
}

export default Hamburger