// Co-pilot generated test file
describe('Example', () => {
    it('should return true', () => {
        const result = true;
        expect(result).toBe(true);
    });

    it('should add two numbers', () => {
        const add = (a: number, b: number) => a + b;
        expect(add(2, 3)).toBe(5);
    });

    it('should handle string concatenation', () => {
        const greeting = (name: string) => `Hello, ${name}!`;
        expect(greeting('World')).toBe('Hello, World!');
    });
});