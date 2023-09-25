"use client";

const sortOptions = [
  { name: "Newest", value: "/?date=desc" },
  { name: "Price, low to high", value: "/?price=asc" },
  { name: "Price, high to low", value: "/?price=desc" },
];

export const ProductSort = () => {
  return (
    <div className="flex items-center">
      <select
        className="form-select w-auto"
        onChange={(e) => {
          const selectedValue = e.target.value;
          window.location.href = selectedValue;
        }}
        aria-label="Default select">
        <option value="" hidden>
          Sort By
        </option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
