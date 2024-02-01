const rows = ['QWERTYUIOP', 'ASDFGHJKL', '+ZXCVBNM-'];

/*
TODO: Add in button press for keyboard,
TODO: Add in functionality to handle the colors of the letters that have been used.
*/

const Qwerty = () => {
    return (
        <div>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-2 mb-2">
                    {row.split('').map((letter, letterIndex) => (
                        <div key={letterIndex} className="rounded-md m-px flex px-4 py-2 items-center justify-center uppercase bg-gray-200">
                            {letter === '+' ? 'Enter' : letter === '-' ? 'Delete' : letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Qwerty;