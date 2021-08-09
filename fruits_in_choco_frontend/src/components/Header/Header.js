import React from 'react';
import style from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {
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
                    <NavLink to={'/shop'}>Магазин</NavLink>
                    <NavLink to={'/promotions'}>Акции</NavLink>
                    <NavLink to={'/buyers'}>Покупателям</NavLink>
                    <NavLink to={'/reviews'}>Отзывы</NavLink>
                    <NavLink to={'/contacts'}>Контакты</NavLink>
                </nav>
                <div className={style.navbarAside}>
                    {props.isAuth
                        ?
                        <div>
                            <NavLink to={'#'} onClick={props.logout}>Выйти</NavLink>
                        </div>
                        :
                        <div>
                            <NavLink to={'/login'}>Войти</NavLink>
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