import { describe, it } from 'mocha';
import fetch from 'node-fetch';

describe('Weather Station', () => {
    const cities = ['San Jose', 'Santa Clara', 'San Francisco', 'Pleasanton', 'Dublin', 'San Diego', 'Union City', 'Mountain View'];

    cities.forEach(city => {
        it(`should fetch weather data for ${city}`, async function() {
            const API_KEY = "d8141703bbdf421fb0825733242604";
            const API_URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

            try {
                const { expect } = await import('chai');
                const response = await fetch(API_URL);
                const data = await response.json();

                expect(data.location.name).to.equal(city);
                expect(data.current.temp_c).to.be.a('number');
                expect(data.current.humidity).to.be.a('number');
                expect(data.current.pressure_mb).to.be.a('number');
            } catch (error) {
                // If there's an error, fail the test
                throw new Error(`Failed to fetch weather data for ${city}: ` + error.message);
            }
        });
    });
});
