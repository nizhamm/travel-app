import "./footer.css";

function Footer() {
  return (
    <>
      <footer className="footer-container">
        <div className="footer-left">
          <h3>
            <span>Rtravel</span>
          </h3>
          <p className="page-links">
            <a href="#0" className="link-1">
              Home
            </a>
            <a href="#0">Blog</a>
            <a href="#0">Pricing</a>
            <a href="#0">About</a>
            <a href="#0">Faq</a>
            <a href="#0">Contact</a>
          </p>

          <p className="footer-company-name">Rtravel © 2024</p>
        </div>

        <div className="footer-main">
          <div>
            <i className="bi bi-pin-map"></i>
            <p>
              <span># 52, Bishop gate</span> United Kingdom
            </p>
          </div>

          <div>
            <i className="bi bi-phone"></i>
            <p>+44 00 000 111</p>
          </div>

          <div>
            <i className="bi bi-envelope"></i>
            <p>
              <a href="mailto:help@rvisti.com">help@rvisit.com</a>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="company-about">
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          <div className="footer-icons">
            <a href="#0">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#0">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#0">
              <i className="bi bi-linkedin"></i>
            </a>
            <a href="#0">
              <i className="bi bi-github"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
