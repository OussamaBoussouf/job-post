import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import citiesList from "@/lib/countries";


function LocationInput({onSelectLocation}) {
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [hasFocus, setHasFocus] = useState(false);
  const handleChange = (event) => {
    setLocationSearchInput(event.target.value);
  };


  const cities = useMemo(() => {
    if (!locationSearchInput.trim()) return [];

    const searchWords = locationSearchInput.split(" ").join(", ");

    return citiesList.map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
      .filter((city) => city.toLowerCase().includes(searchWords.toLowerCase()))
      .slice(0, 5);
  }, [locationSearchInput]);


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
      <div className="absolute top-[100%] w-full">
        {hasFocus && !cities.length && locationSearchInput && <p className="border-[1px] bg-white text-start p-2">No results found</p>}
        {hasFocus && cities.map(city => (
            <button key={city} type="button" onMouseDown={() => {
              onSelectLocation(city);
              setLocationSearchInput("");
            }} className="w-full border-[1px] bg-white text-start p-2">{city}</button>
        ))}
      </div>
    </div>
  );
}

export default LocationInput;
