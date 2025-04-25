import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    try {
      const parsedValue = JSON.parse(value);
      if (parsedValue.country && parsedValue.exact) {
        const countryInfo = formattedCountries.find(
          (item) => item.value === parsedValue.country
        );

        return {
          ...countryInfo,
          exactLocation: parsedValue.exact,
          latlng: [parsedValue.exact.lat, parsedValue.exact.lng],
          exactAddress: parsedValue.exact.address,
        };
      }
    } catch (error) {
      console.error("Error parsing value:", error);
      return null;
    }

    return formattedCountries.find((item) => item.value === value);
  };

  return { getAll, getByValue };
};

export default useCountries;
