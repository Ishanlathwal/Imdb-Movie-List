/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";

export const SearchBar = ({ setQuery }) => {
  const [input, setinput] = useState("");

  const inputDOMelement = useRef(null);

  useEffect(() => {
    inputDOMelement.current.focus();
    // jab kbhi khi bhi application m enter click kare to search box focus ho jaye
    // function callBack(e) {
    //   if (document.activeElement === inputDOMelement.current) return;

    //   if (e.code === "Enter") {
    //     inputDOMelement.current.focus();
    //     setQuery("");
    //   }
    // }

    // document.addEventListener("keydown", callBack);

    // return () => document.addEventListener("keydown", callBack);
  }, []);

  const handleSubmit = (e) => {
    // console.log(e);
    e.preventDefault();
    setQuery(input);
    setinput("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className='search'
          type='text'
          placeholder='Search movies...'
          value={input}
          onChange={(e) => setinput(e.target.value)}
          ref={inputDOMelement}
        />

        <button className='btn'> Search 🔍</button>
      </form>
    </>
  );
};
