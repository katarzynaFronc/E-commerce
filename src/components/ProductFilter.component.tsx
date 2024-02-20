"use client";

import { Accordion } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "cards", label: "Cards" },
      { value: "papers", label: "Papers" },
      { value: "embellishments", label: "Embellishments" },
    ],
  },

  {
    id: "themes",
    name: "Themes",
    options: [
      { value: "christmas", label: "Christmas" },
      { value: "everyday", label: "Everyday" },
      { value: "winter", label: "Winter" },
      { value: "spring", label: "Spring" },
      { value: "flowers", label: "Flowers" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "7,5x10", label: "7,5x10" },
      { value: "10x15", label: "10x15" },
      { value: "30x30", label: "30x30" },
    ],
  },
];

export const ProductFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchValues = Array.from(searchParams!.entries());

  return (
    <>
      {filters.map((section, i) => (
        <Accordion key={i}>
          <Accordion.Item eventKey={`item-${i}`}>
            <Accordion.Header>
              {section.name}
              <small className="text-uppercase">{searchParams?.get(section.id) ? `(${searchParams.get(section.id)})` : ""}</small>
            </Accordion.Header>
            <Accordion.Body>
              <div>
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="d-flex align-items-center px-2 py-1">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`filter-${section.id}-${optionIdx}`}
                      checked={searchValues.some(([key, value]) => key === section.id && value === option.value)}
                      onChange={(event) => {
                        const params = new URLSearchParams(searchParams!);
                        const checked = event.target.checked;

                        if (checked) {
                          params.set(section.id, option.value);
                        } else {
                          params.delete(section.id);
                        }

                        router.push(`/?${params.toString()}`);
                      }}
                    />
                    <label htmlFor={`filter-${section.id}-${optionIdx}`} className="form-check-label ps-2">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
};
