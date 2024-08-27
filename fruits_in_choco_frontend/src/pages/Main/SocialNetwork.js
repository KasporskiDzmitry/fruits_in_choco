import React from 'react';
import appStyle from '../../App.module.scss';
import style from './Main.module.scss';
import instagramIcon from '../../assets/images/instagram_icon.png';
import tiktokIcon from '../../assets/images/tiktok_icon.png';

export const SocialNetwork = () => {
    return (
        <div id={'social_networks'} className={`${appStyle.sectionOuter} ${style.socialNetworks}`}>
            <div className={`${appStyle.sectionInner} ${style.socialNetworksWrapper}`}>
                <p>
                    Подписывайтесь на нас в социальных сетях чтобы всегда быть в курсе новинок,
                    акций и розыгрышей
                </p>
                <div className={style.socialNetworksItemsWrapper}>
                    <div className={style.socialNetworksItem}>
                        <img src={instagramIcon} alt="Ссылка на инстаграм" /> {/* сделать ссылки */}
                    </div>
                    <div className={style.socialNetworksItem}>
                        <img src={tiktokIcon} alt="Ссылка на тикток" />
                    </div>
                </div>
            </div>
        </div>
    );
};
