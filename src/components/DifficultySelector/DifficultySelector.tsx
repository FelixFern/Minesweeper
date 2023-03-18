import styles from "./difficultySelector.module.scss";

type SelectorProps = {
    selected: number;
    setSelected: (val: number) => void;
    start: (val: boolean) => void;
};

const DifficultySelector = ({
    selected,
    setSelected,
    start,
}: SelectorProps) => {
    return (
        <div className="flex gap-2 py-4 mx-auto w-fit">
            <div
                role="button"
                className={`${styles.selector} ${
                    selected === 0
                        ? "border-2 border-blue-400"
                        : "border-2 border-white"
                }`}
                onClick={() => setSelected(0)}
            >
                Easy
            </div>
            <div
                role="button"
                className={`${styles.selector} ${
                    selected === 1
                        ? "border-2 border-blue-400"
                        : "border-2 border-white"
                }`}
                onClick={() => setSelected(1)}
            >
                Medium
            </div>
            <div
                role="button"
                className={`${styles.selector} ${
                    selected === 2
                        ? "border-2 border-blue-400"
                        : "border-2 border-white"
                }`}
                onClick={() => setSelected(2)}
            >
                Hard
            </div>
            <button
                type="button"
                className="px-5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                    start(false);
                    setTimeout(() => {
                        start(true);
                    }, 100);
                }}
            >
                Play
            </button>
        </div>
    );
};

export default DifficultySelector;
