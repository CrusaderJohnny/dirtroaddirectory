"use client";
import { useState } from "react";
import Square from "./square"; // Assuming square.ts or square.tsx
import "./styles.css";
import {Center, Container, Group} from "@mantine/core";

// Define a type for the possible values in a square
type SquareValue = "X" | "O" | null;

export default function Board() {
    // State for whose turn it is
    const [xIsNext, setXIsNext] = useState<boolean>(true);

    // State for the board squares. It's an array of 9 elements,
    // where each element can be 'X', 'O', or null.
    const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));

    // Function to handle a square click
    function handleClick(i: number): void {
        // If the square is already filled or there's a winner, do nothing
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        // Create a copy of the squares array to modify
        const nextSquares: SquareValue[] = squares.slice();

        // Place 'X' or 'O' based on whose turn it is
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        // Update the state
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }

    // Function to calculate the winner
    function calculateWinner(squares: SquareValue[]): SquareValue {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            // Check if there's a value and if all three in the line are the same
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // Return the winner ('X' or 'O')
            }
        }
        return null; // No winner yet
    }

    function HandleReset(): void {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    // Determine the winner and update status message
    const winner: SquareValue = calculateWinner(squares);
    let status: string;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }

    return (
        <>
            <Container className="status">{status}</Container>
            <Container className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </Container>
            <Container className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </Container>
            <Container className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </Container>
            <Container mt={10}>
                <Center>
                    <button className="reset-button" onClick={() => HandleReset()}>Reset Game</button>
                </Center>
            </Container>
        </>
    );
}