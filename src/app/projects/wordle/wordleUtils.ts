export enum TileState {
    CORRECT = "Correct",
    INCORRECT_LOCATION = "Incorrect Location",
    INCORRECT_VALUE = "Incorrect Value",
}


export function evaluateGuess(guess: string[], answer: string[]): TileState[] {
    if (guess.length !== answer.length) {
        throw new RangeError(`Guess (${guess.length}) and answer (${answer.length}) must be the same length`);
    }

    const columnCount = guess.length;
    const result: TileState[] = Array(columnCount).fill(TileState.INCORRECT_VALUE);

    // This loop checks for exact matches and removes them from the target string.
    // This is important for if we guess a letter twice, and one of them is a match.
    // In this case we want to show only one green tile, so we remove the letter
    // to make sure that the orange tile doesn't match against it.
    // For example, if the word was 'SASSY' and we guess 'STONE', then after this loop
    // runs the remaining will be '_ASSY' (Where _ is actually ""). The idea here is that
    // each time we colour a character, we remove it so that it isn't matched twice.
    // It's important that we first check for exact matches, as the next check checks 
    // the entire string each time.
    for (let j=0; j<columnCount; ++j) {
        if (answer[j] === guess[j]) {
            result[j] = TileState.CORRECT;
            answer[j] = "";
        }
    }

    // This check then checks if the letter is anywhere in the string. Importantly, we've
    // already removed the exact matches so we shouldn't get duplicate colours. Again, it's
    // important that we remove characters from the target word after we match against them
    // to ensure that each letter of the guess references a unique character from the target.
    for (let j=0; j<columnCount; ++j) {
        if (guess[j] === "")
            break;

        if (result[j] === TileState.CORRECT)
            continue;

        let indexOf = answer.indexOf(guess[j]);
        if (indexOf !== -1) {
            result[j] = TileState.INCORRECT_LOCATION;
            answer[indexOf] = "";
        }
    }
    return result;
}