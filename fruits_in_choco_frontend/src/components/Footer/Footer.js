import React from 'react';
import style from './Footer.module.scss';
import logo from '../../assets/images/logo.png';
import appStyle from '../../App.module.scss';
import { Link } from 'react-router-dom';
import { scrollToTarget } from '../../util/routes';
import instagramIcon from '../../assets/images/instagram_icon.png';
import tiktokIcon from '../../assets/images/tiktok_footer_icon.png';

const Footer = () => {
    return (
        <footer className={`${appStyle.sectionOuter} ${style.footer}`}>
            <div className={`${appStyle.sectionInner} ${style.footerWrapper}`}>
                <div
                    className={style.logoWrapper}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    <Link to={'/'}>
                        <img src={logo} alt="MARINA CUPCAKE" />
                    </Link>
                </div>
                <nav className={style.navigation}>
                    <div>
                        <Link
                            to={{ pathname: '/', hash: '#production' }}
                            onClick={() => scrollToTarget('production')}
                        >
                            Каталог
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={{ pathname: '/', hash: '#about' }}
                            onClick={() => scrollToTarget('about')}
                        >
                            О нас
                        </Link>
                    </div>
                    <div>
                        <Link
                            to={{ pathname: '/', hash: '#contacts' }}
                            onClick={() => scrollToTarget('contacts')}
                        >
                            Контакты
                        </Link>
                    </div>
                </nav>
                <div id={'contacts'} className={style.contactsWrapper}>
                    <div>Дзержинск, Минская область</div>
                    <div>marina_anufrieva_96@mail.ru</div>
                    <div>+375(29) 812-97-49</div>
                </div>
                <div className={style.socialNetworksWrapper}>
                    <div>
                        <img src={instagramIcon} alt="Ссылка на инстаграм" />{' '}
                        {/* TODO: сделать ссылки */}
                    </div>
                    <div>
                        <img src={tiktokIcon} alt="Ссылка на тикток" />
                    </div>
                </div>
            </div>
            <div className={style.copyright}>Copyright</div>
        </footer>
    );
};

export default Footer;
