"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultSearchQuery = searchParams?.get("search") ?? "";

  if (pathname?.startsWith("/studio")) return null;

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search");
    router.replace(`/?search=${searchQuery}`);
  };

  return (
    <div className="" id="navbarSupportedContent">
      <form onSubmit={onSubmit} className="d-flex" role="search">
        <input id="search" name="search" className="form-control ms-2" type="text" placeholder="Search products..." aria-label="Search" defaultValue={defaultSearchQuery} />
        <button className="searchBtn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};
