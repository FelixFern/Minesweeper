import { useEffect, useState } from "react";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import MinesweeperGrid from "./components/MinesweeperGrid/MinesweeperGrid";

const App = () => {
    const [grid, setGrid] = useState<Array<number[] | string[]>>([]);
    const [showedGrid, setShowedGrid] = useState<Array<boolean[]>>([]);
    const [difficulty, setDifficulty] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);

    const generateGrid = () => {
        const gridSize = difficulty === 0 ? 16 : difficulty === 1 ? 20 : 24;
        const numberOfBomb = difficulty === 0 ? 24 : difficulty === 1 ? 48 : 64;
        const tempGrid: Array<number[] | string[] | any[]> = [];
        const tempShowGrid: Array<boolean[]> = [];

        for (let i = 0; i < gridSize; i++) {
            tempGrid.push([]);
            tempShowGrid.push([]);
            for (let j = 0; j < gridSize; j++) {
                tempGrid[i].push(0);
                tempShowGrid[i].push(false);
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
                    console.log(j, k);
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

    const handleShowGrid = (row_index: number, col_index: number) => {
        const temp = [...showedGrid];
        temp[row_index][col_index] = true;
        setShowedGrid(() => [...temp]);
    };

    useEffect(() => {
        generateGrid();
    }, [started]);

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
