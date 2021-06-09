import React from 'react';
import {useTranslation} from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation();
  return (
      <div className="div_footer">
        <div  className="main-content">
          <div className="left box">
            <h2 style={{color:'#88d498'}}>{t('Customer_Home.11')}</h2>
            <div className="content">
              <p >{t('Customer_Home.14')}</p>
            </div>
          </div>

          <div className="center box">
            <h2  style={{color:'#88d498'}}>{t('Customer_Home.12')}</h2>
            <div className="content">
              <div className="place" >
                <span className="fas fa-map-marker-alt"></span>
                <span className="text">1 Võ Văn Ngân, P.Linh Chiểu, Q.Thủ Đức, TP.HCM</span>
              </div>
              <div className="place">
                <span className="fas fa-map-marker-alt"></span>
                <span className="text">484 Lê Văn Việt, P.Tăng Nhơn Phú, Q.9, TP.HCM</span>
              </div>
            </div>
          </div>

          <div className="right box">
            <h2  style={{color:'#88d498'}}>{t('Customer_Home.13')}</h2>
            <div className="content">
             
            </div>
            <div >
                <div className="phone">
                  <span className="fas fa-phone-alt"></span>
                  <span className="text" style={{fontSize: '0.7em',fontWeight: 500,paddingLeft:"10px"}}>0984931857</span>
                </div>
                <div className="email">
                  <span className="fas fa-envelope" ></span>
                  <span className="text" style={{fontSize: '0.7em',fontWeight: 500,paddingLeft:"10px"}}>thinhhuynhngochung@gmail.com</span>
                </div>
              </div>
          </div>
        </div>
        <div className="bottom">
          <center>
            <span className="credit">Created By TINA BOOK | </span>
            <span className="far fa-copyright"></span><span> 2020 All rights reserved.</span>
          </center>
        </div>
    </div>
  );
};

export default Footer;