import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer>
        <div  className="main-content">
          <div className="left box">
            <h2>About us</h2>
            <div className="content">
              <p>Tina là một công ty bán sách trực tuyến được thành lập vào 10/2020 với 2 cổ đông chính là Lê Hồng Đạo và Hưng Thịnh với số vốn đầu tư lên tới gần 1 tỷ $.</p>
            </div>
          </div>

          <div className="center box">
            <h2>Address</h2>
            <div className="content">
              <div className="place">
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
            <h2>Contact us</h2>
            <div className="content">
              <form action="#">
                <div className="phone">
                  <span className="fas fa-phone-alt"></span>
                  <span className="text">0984931857</span>
                </div>
                <div className="email">
                  <span className="fas fa-envelope"></span>
                  <span className="text">thinhhuynhngochung@gmail.com</span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom">
          <center>
            <span className="credit">Created By TINA BOOK | </span>
            <span className="far fa-copyright"></span><span> 2020 All rights reserved.</span>
          </center>
        </div>
      </footer>
    </div>
  );
};

export default Footer;