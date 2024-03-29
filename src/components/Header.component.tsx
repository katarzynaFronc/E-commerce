"use client";

import Link from "next/link";
import "../assets/sass/style.css";
import { Button } from "react-bootstrap";
import { SearchForm } from "./SearchForm.component";
import { useShoppingCart } from "use-shopping-cart";

export const Header = () => {
  const { cartCount } = useShoppingCart();

  return (
    <nav className="navbar navbar-expand-lg border-bottom">
      <div className="container-fluid d-flex justify-content-around">
        <a className="navbar-brand" href="../">
          <picture>
            <img src="/icon/logo.png" alt="logo" className="navbar-brand-logo"></img>
          </picture>
        </a>
        <SearchForm />
        <div>
          <Link href="/cart">
            <Button size="sm" variant="ghost" className="d-inline-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cart2 custom-color" viewBox="0 0 16 16">
                <path
                  className="custom-stroke"
                  d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                />
              </svg>
              <span className="ml-2 text-sm text-decoration-none custom-color">{cartCount}</span>
            </Button>
          </Link>

          {process.env.NODE_ENV === "development" && (
            <Link href="/studio">
              <Button type="button" className="btn btn-link border-0 " variant="ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
