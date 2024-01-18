"use client";

import { useRouter } from "next/navigation";

const sortOptions = [
  { name: "Newest", value: "/?date=desc" },
  { name: "Price, low to high", value: "/?price=asc" },
  { name: "Price, high to low", value: "/?price=desc" },
];

export const ProductSort = () => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      <select
        className="form-select w-auto"
        onChange={(event) => {
          router.replace(event.target.value);
        }}
        aria-label="Default select">
        <option value="" hidden>
          Sort By
        </option>
        {sortOptions.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
