import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, SetSearch] = useState(null); // initial state null, using useState hook

  const loadOptions = (inputValue) => {

    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
            options: response.data.map((city) => {
                return {
                    value: `${city.latitude} ${city.longitude}`, // we need lati/longi-tude to to show the city weather
                    label: `${city.name}, ${city.countryCode}`,
                }
            })
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    // search data= data that we changes in async paginate
    SetSearch(searchData);
    onSearchChange(searchData);
  };
  return (
    <AsyncPaginate
      placeholder="Search for cities"
      debounceTimeout={600} // if calling api at the same time may create problem thats y debounce time
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
export default Search;
