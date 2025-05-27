type SquareProps = {
    value: string | null; // Assuming 'value' can be a string (e.g., "X", "O") or null
    onSquareClick: () => void; // Assuming 'onSquareClick' is a function that takes no arguments and returns nothing
};

export default function Square({value, onSquareClick} : SquareProps) {
    return (
        <button
            className="square"
            onClick={onSquareClick}
        >{value}</button>
    )
}