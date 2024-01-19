import Image from "next/image";

export const Footer = () => {
  return (
    <div className="footer-container container-fluid  align-items-end">
      <div className="row justify-content-around px-5 py-3">
        <div className="col-md-8">
          <span className="small">Copyright © 2024 KF</span>
          <p className="small">All rights reserved</p>
        </div>
        <div className="col-md-2">
          <span>Contact me:</span>
          <div>
            <a href="https://pl.linkedin.com/in/katarzyna-f">
              <picture>
                <img src="/icon/iconmonstr-linkedin-4-240.png" alt="LinkedIn" className="footer-icon"></img>
              </picture>
            </a>
            <a href="https://github.com/katarzynaFronc">
              <picture>
                <img src="/icon\github-mark.png" alt="GitHub" className="footer-icon"></img>
              </picture>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
