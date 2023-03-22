import { useEffect, useState } from "react";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import MinesweeperGrid from "./components/MinesweeperGrid/MinesweeperGrid";

const App = () => {
    const [grid, setGrid] = useState<Array<number[] | string[]>>([]);
    const [showedGrid, setShowedGrid] = useState<Array<string[]>>([]);
    const [difficulty, setDifficulty] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [revealedGrid, setRevealedGrid] = useState<number>(0);

    const gridSize = difficulty === 0 ? 16 : difficulty === 1 ? 20 : 24;
    const numberOfBomb = difficulty === 0 ? 24 : difficulty === 1 ? 48 : 64;

    const generateGrid = () => {
        const tempGrid: Array<number[] | string[] | any[]> = [];
        const tempShowGrid: Array<string[]> = [];

        for (let i = 0; i < gridSize; i++) {
            tempGrid.push([]);
            tempShowGrid.push([]);
            for (let j = 0; j < gridSize; j++) {
                tempGrid[i].push(0);
                tempShowGrid[i].push("hide");
            }
        }

        for (let i = 0; i < numberOfBomb; i++) {
            let x = Math.floor(Math.random() * gridSize);
            let y = Math.floor(Math.random() * gridSize);

            while (tempGrid[y][x] === "x") {
                x = Math.floor(Math.random() * gridSize);
                y = Math.floor(Math.random() * gridSize);
            }

            tempGrid[y][x] = "x";

            for (let j = -1; j < 2; j++) {
                for (let k = -1; k < 2; k++) {
                    if (
                        tempGrid[Math.max(0, Math.min(gridSize - 1, y + j))][
                            Math.max(0, Math.min(gridSize - 1, x + k))
                        ] != "x" &&
                        y + j != 0 &&
                        x + k != 0
                    ) {
                        tempGrid[Math.max(0, Math.min(gridSize - 1, y + j))][
                            Math.max(0, Math.min(gridSize - 1, x + k))
                        ] += 1;
                    }
                }
            }
        }
        setGrid(() => [...tempGrid]);
        setShowedGrid(() => [...tempShowGrid]);
    };

    const handleShowGrid = (
        row_index: number,
        col_index: number,
        recursive: boolean,
        click?: any
    ) => {
        const temp = [...showedGrid];
        const steps = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
        ];

        if (click === "right") {
            temp[row_index][col_index] =
                temp[row_index][col_index] === "flag"
                    ? "hide"
                    : temp[row_index][col_index] === "hide"
                    ? "flag"
                    : "show";
            setShowedGrid(() => [...temp]);
            return;
        }
        setRevealedGrid(() => revealedGrid + 1);

        if (
            grid[row_index][col_index] === 0 &&
            temp[row_index][col_index] === "hide"
        ) {
            temp[row_index][col_index] = "show";
            steps.map((step) => {
                handleShowGrid(
                    Math.max(0, Math.min(gridSize - 1, row_index + step[0])),
                    Math.max(0, Math.min(gridSize - 1, col_index + step[1])),
                    true
                );
            });
        }
        if (recursive === false) {
            temp[row_index][col_index] = "show";
            if (grid[row_index][col_index] === "x") {
                alert("You Lose");
                setRevealedGrid(0);
                generateGrid();
                return;
            }
        } else {
            if (grid[row_index][col_index] !== "x") {
                temp[row_index][col_index] = "show";
                return;
            }
        }
        setShowedGrid(() => [...temp]);
    };

    useEffect(() => {
        generateGrid();
    }, [started]);

    useEffect(() => {
        console.log("Revealed ", revealedGrid);
        console.log(gridSize * gridSize - numberOfBomb);
        if (revealedGrid === gridSize * gridSize - numberOfBomb) {
            alert("You Win!");
        }
    }, [revealedGrid]);

    useEffect(() => {
        document.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });
    }, []);

    return (
        <main className="w-screen h-screen py-10 bg-blue-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-center text-blue-500">
                    Minesweeper
                </h1>
                <p className="text-blue-600">Created with React</p>
            </div>
            <DifficultySelector
                selected={difficulty}
                setSelected={setDifficulty}
                start={setStarted}
            ></DifficultySelector>
            <div className="p-4 mx-auto w-fit">
                {started && grid != [] ? (
                    <>
                        <MinesweeperGrid
                            grid={grid}
                            showGrid={showedGrid}
                            updateGrid={handleShowGrid}
                        ></MinesweeperGrid>
                    </>
                ) : (
                    <>
                        <h1>Game Not Started</h1>
                    </>
                )}
            </div>
        </main>
    );
};

export default App;
