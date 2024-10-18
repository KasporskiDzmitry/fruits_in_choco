import React, {useRef, useState} from 'react';
import style from './Header.module.scss';
import appStyle from '../../App.module.scss';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {scrollToTarget} from '../../util/routes';
import logo from '../../assets/images/logo.png';

const Header = (props) => {
    const header = useRef(null);
    const nav = useRef(null);
    const menuButton = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
        nav.current.classList.toggle(style.active);
    };

    return (
        <header ref={header}>
            <div className={appStyle.sectionInner}>
                <div className={style.navbar}>
                    <div className={style.logoWrapper}>
                        <Link to={'/'}>
                            <img
                                src={logo}
                                alt="MARINA CUPCAKE"
                                onClick={() => window.scrollTo(0, 0)}
                            />
                        </Link>
                    </div>
                    <div ref={menuButton} className={style.toggleNavBtn}>
                        <FontAwesomeIcon icon={faBars} onClick={toggleMenu}/>
                    </div>
                    <nav ref={nav}>
                        <Link
                            to={{pathname: '/', hash: '#production'}}
                            onClick={() => scrollToTarget('production')}
                        >
                            Каталог
                        </Link>
                        <Link
                            to={{pathname: '/', hash: '#about'}}
                            onClick={() => scrollToTarget('about')}
                        >
                            О нас
                        </Link>
                        <Link
                            to={{pathname: '/', hash: '#howToOrder'}}
                            onClick={() => scrollToTarget('howToOrder')}
                        >
                            Как заказать
                        </Link>
                        <Link
                            to={{pathname: '/', hash: '#contacts'}}
                            onClick={() => scrollToTarget('contacts')}
                        >
                            Контакты
                        </Link>
                        <Link
                            to={{pathname: '/', hash: '#reviews'}}
                            onClick={() => scrollToTarget('reviews')}
                        >
                            Отзывы
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
