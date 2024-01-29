import Image from "next/image";

export const Footer = () => {
  return (
    <div className="footer-container container-fluid  align-items-end">
      <div className="row justify-content-around px-5 py-3">
        <div className="mb-3 mb-md-0 col-md-8 d-flex flex-column">
          <p className="small mb-2 mb-md-3">Copyright © 2024 KF</p>
          <p className="small">All rights reserved</p>
        </div>
        <div className="col-md-2">
          <p className="mb-3">Contact me:</p>
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
