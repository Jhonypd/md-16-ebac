/** @format */

import axios from "axios";

const API_KEY = "43516d94aa6621d39bfa57b4db4940bf";
const BASE_URL = "https://data.fixer.io/api";

export const getExchangeRates = async (
	base = "USD",
	symbols = "GBP,JPY,EUR",
) => {
	try {
		const response = await axios.get(`${BASE_URL}/latest`, {
			params: {
				access_key: API_KEY,
				base,
				symbols,
			},
		});
		return response.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
