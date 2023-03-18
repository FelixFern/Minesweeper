import styles from "./minesweeperGrid.module.scss";

type GridProps = {
    grid: Array<number[] | string[]>;
    showGrid: Array<boolean[]>;
    updateGrid: (i: number, j: number) => void;
};

const MinesweeperGrid = ({ grid, showGrid, updateGrid }: GridProps) => {
    return (
        <div className={`${styles.columnContainer}`}>
            {grid.map((col, i) => {
                return (
                    <div key={i} className={`${styles.rowContainer}`}>
                        {col.map((row, j) => {
                            const color =
                                row == 1
                                    ? "text-red-600"
                                    : row === 2
                                    ? "text-green-600"
                                    : row === 3
                                    ? "text-yellow-600"
                                    : row === 4
                                    ? "text-orange-600"
                                    : row === 5
                                    ? "text-purple-600"
                                    : row === 6
                                    ? "text-brown-600"
                                    : row === 0
                                    ? "text-gray-200"
                                    : row === "x"
                                    ? "text-black"
                                    : "text-white";
                            return (
                                <div
                                    key={j}
                                    className={`${styles.row} ${
                                        showGrid[i][j] === false
                                            ? "bg-white"
                                            : "bg-gray-200"
                                    } border border-blue-300`}
                                    onClick={() => updateGrid(i, j)}
                                >
                                    <p
                                        className={`${
                                            showGrid[i][j] === true
                                                ? color
                                                : "text-white"
                                        } font-bold`}
                                    >
                                        {row}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default MinesweeperGrid;
