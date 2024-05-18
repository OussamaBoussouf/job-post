import { Input } from "@/components/ui/input";
import { useState, useMemo, useEffect } from "react";

function LocationInput({ onSelectLocation }) {
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const [countries, setCountries] = useState([]);
  const handleChange = (event) => {
    setLocationSearchInput(event.target.value);
  };


  const cities = useMemo(() => {
    if (!locationSearchInput.trim()) return [];

    const searchWords = locationSearchInput.split(" ").join(", ");

    return countries
      .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
      .filter((city) => city.toLowerCase().includes(searchWords.toLowerCase()))
      .slice(0, 5);
  }, [locationSearchInput]);

  useEffect(() => {
    const fetchData = async () =>{
      const data = await fetch("/countries.json");
      const res = await data.json();
      setCountries(res);
    }

    fetchData();
  },[]);


  return (
    <div className="relative">
      <Input
        value={locationSearchInput}
        onChange={(e) => handleChange(e)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        type="search"
        placeholder="Search for a city..."
      />
      <div className="absolute top-[100%] w-full z-10">
        {hasFocus && !cities.length && locationSearchInput && (
          <p className="border-[1px] bg-white text-start p-2">
            No results found
          </p>
        )}
        {true &&
          cities.map((city) => (
            <button
              key={city}
              type="button"
              onMouseDown={() => {
                onSelectLocation(city);
                setLocationSearchInput("");
              }}
              className="w-full border-[1px] bg-white text-start p-2"
            >
              {city}
            </button>
          ))}
      </div>
    </div>
  );
}

export default LocationInput;
