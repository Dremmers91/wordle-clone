import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { words } from './words';
import Board from './Board.js';
import Qwerty from './Qwerty.js';


/* NOTES:
I ran out of time to get the keyboard working as I would like, currently it is just for show.
I owuld have also liked to get an actual modal to popup for the game win or lose but again ran out of time to style it.
I tried to comment on each of the function and what they do but happy to talk more indepth the code if needed.
*/



const ROWS = 6;

function App() {
    // Set up all the different states I will need to use for the game.
    const [solution, setSolution] = useState(''); // Store the solution word
    const [guesses, setGuesses] = useState(new Array(ROWS).fill('')); // Store the user's guesses
    const [currentWord, setCurrentWord] = useState(''); // Store the current word being typed
    const [currentRow, setCurrentRow] = useState(0); // Store the current row
    const [gameStatus, setGameStatus] = useState(''); // Store the game status (win or lose)

    // Function to randomly select a word from the list of words
    const selectWord = () => setSolution(words[Math.floor(Math.random() * words.length)]);

    // Select a word from the list of words when the component mounts.
    useEffect(() => {
        selectWord();
    }, []);

    // Function to handle when a key is pressed.
    const handleKeyDown = useCallback(e => {
        const { keyCode, key } = e;

        // Handle backspace to delete a letter
        if (keyCode === 8 && currentWord.length) {
            setCurrentWord(currentWord => currentWord.slice(0, -1))
            return;
        }

        // Handle Enter key to submit a word
        if (currentWord.length === 5) {
            if (keyCode !== 13) {
                return;
            } else {
                setGuesses((guesses) =>
                    guesses.map((guess, idx) =>
                        idx === currentRow ? currentWord : guess
                    )
                );
                setCurrentRow((currentRow) => currentRow + 1);
                setCurrentWord('');

                return;
            }
        }

        // Handle alphabetic keys (A-Z)
        if (keyCode >= 65 && keyCode <= 90) {
            setCurrentWord(currentWord => currentWord + key.toUpperCase())
            return;
        }
    }, [currentWord, currentRow]);

    // Check if the guess in the current row is the solution. If so, they win; if not, they lose.
    useEffect(() => {
        if (guesses[currentRow - 1] === solution && solution) {
            setGameStatus('win');
        }
        else if (currentRow > ROWS - 1) {
            setGameStatus('lose');
        }
    }, [guesses, currentRow, solution]);

    // Adding the event listener for the keydown event.
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <div className="w-screen h-screen bg-gray-700">
            <nav className='py-2 flex items-center justify-center'>
                <h1 className='text-6xl font-bold uppercase bg-clip-text bg-gradient-to-br from-blue-400 to-purple-400 text-transparent'>Wordle</h1>
            </nav>
            <div id="Results" className={`${(gameStatus === 'win' || gameStatus === 'lose') ? 'block' : 'hidden'} mb-4 text-center`}>
                <h3 className='text-3xl text-white font-bold'>{gameStatus === 'win' ? 'You Win!' : 'Sorry, you lost!'}</h3>
                <p className='text-white font-bold'>Word: {solution}</p>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <Board guesses={guesses} currentRow={currentRow} currentWord={currentWord} solution={solution} />
                <Qwerty />
            </div>
        </div >
    );
}

export default App;
