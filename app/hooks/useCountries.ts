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

      if (parsedValue.lat && parsedValue.lng && parsedValue.address) {
        const address = parsedValue.address;
        let region = "Unknown";

        const addressParts = address.split(",");
        if (addressParts.length > 1) {
          const potentialCountry = addressParts[addressParts.length - 1].trim();
          const countryMatch = formattedCountries.find(
            (c) => c.label.toLowerCase() === potentialCountry.toLowerCase()
          );

          if (countryMatch) {
            region = countryMatch.region;
          }
        }

        return {
          value: "custom",
          flag: "🌍",
          label: address,
          latlng: [parsedValue.lat, parsedValue.lng],
          region: region,
          exactAddress: parsedValue.address,
        };
      }

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
      return formattedCountries.find((item) => item.value === value);
    }

    return null;
  };

  return { getAll, getByValue };
};

export default useCountries;
