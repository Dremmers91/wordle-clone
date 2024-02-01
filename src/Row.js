const getColors = (solution, word) => {
    const result = solution.split(''); // Split the solution word into an array of letters.

    // Loop to check for letters that are matching. Green.
    for (let i = 0; i < solution.length; i++) {
        if (word[i] === result[i]) result[i] = 'correct'; // Mark matching letters as 'correct'.
    }

    // Loop to check if letters match any of the letters in the word. Yellow.
    for (let i = 0; i < solution.length; i++) {
        const index = result.indexOf(word[i]);

        if (index > -1) result[i] = 'semi-correct'; // Mark semi-matching letters as 'semi-correct'.
    }

    // Return a background color for the letter based on if it's correct or semi-correct.
    return result.map((letter) => {
        if (letter === 'correct') return 'bg-green-600'; // Green background for correct letters.
        if (letter === 'semi-correct') return 'bg-yellow-600'; // Yellow background for semi-correct letters.
        return 'bg-gray-900'; // Gray background for other letters.
    });
};

const Row = ({ word, isFinished, solution }) => {
    const colors = isFinished ? getColors(solution, word) : new Array(5).fill('');

    return (
        new Array(5).fill('').map((_, index) => (
            <div key={index} id="letter" className={`${colors[index]} flex w-16 h-16 items-center justify-center border border-gray-400 font-bold uppercase text-white bg-gray-900`}>
                {word[index] ?? ""}
            </div>
        ))
    )
}

export default Row;