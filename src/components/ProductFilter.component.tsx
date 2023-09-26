"use client";

import { Accordion } from "react-bootstrap";

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
      { value: "at_home", label: "At home" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2x3", label: "2x3" },
      { value: "3x4", label: "3x4" },
    ],
  },
];

export const ProductFilter = () => {
  return (
    <>
      {filters.map((section, i) => (
        <Accordion key={i} className="">
          <Accordion.Item eventKey={`item-${i}`}>
            <Accordion.Header>{section.name}</Accordion.Header>
            <Accordion.Body>
              <div className="space-y-4">
                {section.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <input type="checkbox" className="form-check-input" />
                    <label className="form-check-label ps-2">{option.label}</label>
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
