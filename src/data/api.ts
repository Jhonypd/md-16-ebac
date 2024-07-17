/** @format */

const URL = "https://economia.awesomeapi.com.br/json/";
const coinsUrl = `${URL}available/uniq`; 

const options = {
  method: "GET",
};

type ExchangeRate = {
  ask: string;
  bid: string;
};

export const getExchangeRates = async (
  currency: string,
): Promise<ExchangeRate | null> => {
  const coinSelectedUrl = `${URL}last/${currency}`;

  try {
    const response = await fetch(coinSelectedUrl, options);
    const data = await response.json();
    console.log("API Response:", data);

    const key = Object.keys(data).find(k => k.includes(currency));

    if (response.ok && key && data[key]) {
      const { ask, bid } = data[key];
      return { ask, bid };
    }

    console.error("Invalid response format or error from API:", data);
    return null;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};

export const getAvailableCoins = async () => {
  try {
    const response = await fetch(coinsUrl, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
