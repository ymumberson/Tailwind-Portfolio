import { TileState, evaluateGuess } from "@/app/projects/wordle/wordleUtils";

describe('Wordle guess evaluation', () => {
    it('should evaluate a guess correctly', () => {
        const answer = ['S', 'T', 'O', 'N', 'E'];
        const guess = ['S', 'T', 'O', 'N', 'E'];
        const expected = [
            TileState.CORRECT,
            TileState.CORRECT,
            TileState.CORRECT,
            TileState.CORRECT,
            TileState.CORRECT
        ];
        expect(evaluateGuess(guess, answer)).toEqual(expected);
    });

    it('should evaluate a guess with incorrect locations', () => {
        const answer = ['S', 'T', 'O', 'N', 'E'];
        const guess = ['E', 'N', 'O', 'T', 'S'];
        const expected = [
            TileState.INCORRECT_LOCATION,
            TileState.INCORRECT_LOCATION,
            TileState.CORRECT,
            TileState.INCORRECT_LOCATION,
            TileState.INCORRECT_LOCATION
        ];
        expect(evaluateGuess(guess, answer)).toEqual(expected);
    });

    it('should evaluate a guess with incorrect values', () => {
        const answer = ['S', 'T', 'O', 'N', 'E'];
        const guess = ['A', 'B', 'C', 'D', 'F'];
        const expected = [
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_VALUE
        ];
        expect(evaluateGuess(guess, answer)).toEqual(expected);
    });

    it('should throw an error for guesses of different lengths', () => {
        const answer = ['S', 'T', 'O', 'N', 'E'];
        const guess = ['S', 'T', 'O'];
        expect(() => evaluateGuess(guess, answer)).toThrow(RangeError);
    });
    
    it('should handle repeated letters correctly', () => {
        const answer = ['S', 'A', 'S', 'S', 'Y'];
        const guess = ['S', 'T', 'O', 'N', 'E'];
        const expected = [
            TileState.CORRECT,
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_VALUE
        ];
        expect(evaluateGuess(guess, answer)).toEqual(expected);
    });

    it('should handle repeated letters in guess correctly', () => {
        const answer = ['S', 'A', 'S', 'S', 'Y'];
        const guess = ['S', 'S', 'S', 'S', 'S'];
        const expected = [
            TileState.CORRECT,
            TileState.INCORRECT_VALUE,
            TileState.CORRECT,
            TileState.CORRECT,
            TileState.INCORRECT_VALUE
        ];
        expect(evaluateGuess(guess, answer)).toEqual(expected);
    });

    it('should handle repeated letters in answer correctly', () => {
        const answer = ['S', 'A', 'S', 'S', 'Y'];
        const guess = ['E', 'S', 'S', 'A', 'Y'];
        const expected = [
            TileState.INCORRECT_VALUE,
            TileState.INCORRECT_LOCATION,
            TileState.CORRECT,
            TileState.INCORRECT_LOCATION,
            TileState.CORRECT
        ];
        expect(evaluateGuess(guess, answer)).toEqual(expected);
    });
});