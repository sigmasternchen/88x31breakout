
export function shuffleInPlace(array: any[]) {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function toShuffled <T> (array: T[]) {
    const copy = [...array];
    shuffleInPlace(copy);
    return copy;
}