// src/services/http-service.js

import 'whatwg-fetch';

class httpService {

    getProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/products');

            // Check if response is OK
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Convert to JSON
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // so App.js can catch it too
        }
    }

}

export default httpService;