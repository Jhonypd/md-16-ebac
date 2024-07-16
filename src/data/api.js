/** @format */

// const API_KEY = "43516d94aa6621d39bfa57b4db4940bf";
// const BASE_URL = `https://data.fixer.io/api/symbols?access_key=${API_KEY}`;
const BASE_URL = "https://economia.awesomeapi.com.br/json/USD-BRL";

const options = {
  method: "GET",
};

export const getExchangeRates = async () => {
  try {
    const response = await fetch(BASE_URL, options);

    const result = await response.json();

    console.table(result);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
