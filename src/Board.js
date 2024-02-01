import Row from './Row';

const Board = ({ guesses, currentRow, currentWord, solution }) => (
    <div id="board" className="mb-4">
        {guesses.map((_, rowIndex) => ( // Map through the 'guesses' array to generate rows.
            <div key={rowIndex} id="Row" className="mb-2 grid grid-cols-5 gap-1">
                <Row word={(currentRow === rowIndex ? currentWord : guesses[rowIndex])} isFinished={currentRow > rowIndex} solution={solution} />
            </div>
        ))}
    </div>
);

export default Board;
