import Cell from "./cell.js";
import Graph from "./graph.js";

class Main {
    private static PANEL: HTMLElement = document.getElementById("panel")!;

    private static grid: Cell[][];
    private static graph: Graph<Cell>;
    public static main(): void {
        Main.initBoard();
        setInterval(() => Main.update(), 250);
    }

    private static initBoard(): void {
        Main.PANEL.innerHTML = "";
        if (Main.grid) Main.grid.length = 0;
        Main.grid = [];

        const numOfRows = Math.floor((Main.PANEL.clientHeight - 30) / 15);
        const numOfColumns = Math.floor((Main.PANEL.clientWidth - 30) / 15);
        let cellSideLength = 100 / numOfColumns;
        for (let i = 0; i < numOfRows; i++) {
            let rowDiv = document.createElement("div");
            rowDiv.className = "row";
            Main.grid[i] = [];
            for (let j = 0; j < numOfColumns; j++) {
                const cell = new Cell(i, j, cellSideLength);
                rowDiv.appendChild(cell.div);
                Main.grid[i][j] = cell;
                if (Math.random() < 0.5) cell.switchState();
            }
            Main.PANEL.appendChild(rowDiv);
        }

        Main.graph = new Graph(Main.grid);
    }

    private static update(): void {
        let cellsToSwitchState: Cell[] = [];
        for (let row of Main.grid) {
            for (let cell of row) {
                const aliveNeighborCount =
                    Main.graph.getAliveNeighborCount(cell);
                if (
                    (cell.isAlive &&
                        (aliveNeighborCount < 2 || aliveNeighborCount > 3)) ||
                    (!cell.isAlive && aliveNeighborCount === 3)
                ) {
                    cellsToSwitchState.push(cell);
                }
            }
        }
        cellsToSwitchState.forEach((c) => c.switchState());
    }
}

Main.main();
