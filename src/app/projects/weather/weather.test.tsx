import { KelvinToCelsius } from './utils';

describe('Weather tests', () => {
    it('should handle temperature conversion', () => {
        expect(KelvinToCelsius(273.15)).toBe(0);
    })

    it('should handle negative temperature conversion', () => {
        expect(KelvinToCelsius(250)).toBeCloseTo(-23.15);
    });

    it('should handle high temperature conversion', () => {
        expect(KelvinToCelsius(373.15)).toBe(100);
    });

    it('should handle zero Kelvin conversion', () => {
        expect(KelvinToCelsius(0)).toBe(-273.15);
    });
});