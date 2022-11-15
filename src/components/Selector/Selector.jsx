import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const Selector = () => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const [fakeDate, setFakeData] = useState(["A", "B", "C"]);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCountries(data);
      });
  }, []);
  return (
    <>
      <h1 className="text-white mr-5">{selected}</h1>

      <div className="w-72 font-medium h-80">
        <div
          onClick={() => setOpen(!open)}
          className={`bg-white w-full p-2 flex items-center justify-between rounded ${
            !selected && "text-gray-700"
          }`}
        >
          {selected
            ? selected?.length > 25
              ? selected?.substring(0, 25) + "..."
              : selected
            : "Select Country"}
          <BiChevronDown
            size={20}
            className={`transition-all ${open && "rotate-180"}`}
          />
        </div>
        <ul
          className={`bg-white mt-2 overflow-y-auto ${
            open ? "max-h-60" : "max-h-0"
          } `}
        >
          {countries?.map((country) => (
            <li
              key={country?.name}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white border-t-2
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }`}
              onClick={() => {
                if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(country?.name);
                  setOpen(false);
                }
              }}
            >
              {country?.name}
            </li>
          ))}
          <li>123</li>
          {fakeDate.map((date) => (
            <li
              key={date}
              className={`p-2 text-sm hover:bg-sky-600 hover:text-white border-t-2
            ${
              date.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }`}
              onClick={() => {
                if (date.toLowerCase() !== selected.toLowerCase()) {
                  setSelected(date.name);
                  setOpen(false);
                }
              }}
            >
              {date}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Selector;
