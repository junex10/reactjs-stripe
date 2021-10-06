import React from 'react';

const Footer = () => {
    return (
        <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
      
                <div className="col-lg-4 col-md-6">
                  <div className="footer-info">
                    <h3>Bootslander</h3>
                    <p className="pb-3"><em>Qui repudiandae et eum dolores alias sed ea. Qui suscipit veniam excepturi quod.</em></p>
                    <p>
                      A108 Adam Street <br />
                      NY 535022, USA<br /><br />
                      <strong>Phone:</strong> +1 5589 55488 55<br />
                      <strong>Email:</strong> info@example.com<br />
                    </p>
                    <div className="social-links mt-3">
                      <a href={() => false} className="twitter"><i className="bx bxl-twitter"></i></a>
                      <a href={() => false} className="facebook"><i className="bx bxl-facebook"></i></a>
                      <a href={() => false} className="instagram"><i className="bx bxl-instagram"></i></a>
                      <a href={() => false} className="google-plus"><i className="bx bxl-skype"></i></a>
                      <a href={() => false} className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                  </div>
                </div>
      
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Home</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>About us</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Services</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Terms of service</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Privacy policy</a></li>
                  </ul>
                </div>
      
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Web Design</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Web Development</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Product Management</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Marketing</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href={() => false}>Graphic Design</a></li>
                  </ul>
                </div>
      
                <div className="col-lg-4 col-md-6 footer-newsletter">
                  <h4>Our Newsletter</h4>
                  <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                  <form action="" method="post">
                    <input type="email" name="email" />
                    <input type="submit" value="Subscribe" />
                  </form>
      
                </div>
      
              </div>
            </div>
          </div>
      
          <div className="container">
            <div className="copyright">
              &copy; Copyright <strong><span>Bootslander</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
    );
}

export default Footer;