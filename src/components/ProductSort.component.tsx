import { useRouter } from "next/router";

const sortOptions = [
  { name: "Newest", value: "/?date=desc" },
  { name: "Price, low to high", value: "/?price=asc" },
  { name: "Price, high to low", value: "/?price=desc" },
];

export const ProductSort = () => {
  return (
    <div className="flex items-center">
      <select className="form-select w-auto" aria-label="Default select">
        <option>Sort By</option>
        {sortOptions.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
