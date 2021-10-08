import React from 'react';
import style from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import {useLocation} from 'react-router-dom';

const Header = (props) => {
    const location = useLocation().pathname;

    const handleClick = (e) => {
        e.preventDefault();
        props.setFilteredTypes(props.productTypes)
        props.history.push({pathname: `/shop`, state: {categoryId: 0}})
    }

    return <header className={`sectionOuter ${style.sectionHeader}`}>
        <div className={`sectionInner ${style.sectionInner}`}>
            <div className={style.toggleNavBtn}>
                <i className="fa fa-bars">Кнопка меню для телефона</i>
            </div>
            <div className={style.navbar}>
                <div className='logo'>
                    <NavLink to={'/'}>FRUITS IN CHOCO</NavLink>
                </div>
                <nav className={style.navbarNav}>
                    <a href="/shop" onClick={handleClick}>Магазин</a>
                    {/*<NavLink to={'/shop'}>Магазин</NavLink>*/}
                    <NavLink to={'/promotions'}>Акции</NavLink>
                    <NavLink to={'/buyers'}>Покупателям</NavLink>
                    <NavLink to={'/reviews'}>Отзывы</NavLink>
                    <NavLink to={'/contacts'}>Контакты</NavLink>
                </nav>
                <div className={style.navbarAside}>
                    {localStorage.getItem('isLoggedIn') === 'true'
                        ?
                        <div>
                            <div>
                                <NavLink to={'/profile'}>{localStorage.getItem('name')}</NavLink>
                            </div>
                            <div>
                                // продумать логаут (куда делать редирект)
                                <NavLink to={location === '/profile' ? '/' : '#'} onClick={props.logout}>Выйти</NavLink>
                            </div>
                        </div>
                        :
                        <div>
                            <div>
                                <NavLink to={'/login'}>Sign In</NavLink>
                            </div>
                            <div>
                                <NavLink to={'/registration'}>Sign Up</NavLink>
                            </div>
                        </div>
                    }

                    <div className={style.navbarAside__phone}>+375 (29) 111-22-33</div>
                    <div className={`${style.navbarAside__search} ${style.icon}`}></div>
                    <div className={`${style.navbarAside__profile} ${style.icon}`}></div>
                </div>
            </div>
        </div>
    </header>
};

export default Header;