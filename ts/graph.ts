interface Edge<T> {
    n1: T;
    n2: T;
}

export default class Graph<T extends { id: string; isAlive: boolean }> {
    public graph: {
        [id: string]: {
            node: T;
            neighbors: Set<T>;
        };
    };
    public constructor(grid: T[][]) {
        this.graph = {};

        const { nodes, edges } = this.gridToGraphInfo(grid);
        nodes.forEach((node) => this.addNode(node));
        edges.forEach((edge) => this.addEdge(edge));
    }
    private gridToGraphInfo(grid: T[][]): {
        nodes: T[];
        edges: Edge<T>[];
    } {
        const height: number = grid.length;
        const width: number = grid[0].length;
        let nodes: T[] = [];
        let edges: Edge<T>[] = [];

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                nodes.push(grid[i][j]);
                const isNotTopBorder = i - 1 >= 0;
                const isNotBottomBorder = i + 1 < height;
                const isNotLeftBorder = j - 1 >= 0;
                const isNotRightBorder = j + 1 < width;
                if (isNotTopBorder) {
                    edges.push({
                        n1: grid[i][j],
                        n2: grid[i - 1][j],
                    });
                    if (isNotRightBorder) {
                        edges.push({
                            n1: grid[i][j],
                            n2: grid[i - 1][j + 1],
                        });
                    }
                }
                if (isNotRightBorder) {
                    edges.push({
                        n1: grid[i][j],
                        n2: grid[i][j + 1],
                    });
                    if (isNotBottomBorder) {
                        edges.push({
                            n1: grid[i][j],
                            n2: grid[i + 1][j + 1],
                        });
                    }
                }
                if (isNotBottomBorder) {
                    edges.push({
                        n1: grid[i][j],
                        n2: grid[i + 1][j],
                    });
                    if (isNotLeftBorder) {
                        edges.push({
                            n1: grid[i][j],
                            n2: grid[i + 1][j - 1],
                        });
                    }
                }
                if (isNotLeftBorder) {
                    edges.push({
                        n1: grid[i][j],
                        n2: grid[i][j - 1],
                    });
                    if (isNotTopBorder) {
                        edges.push({
                            n1: grid[i][j],
                            n2: grid[i - 1][j - 1],
                        });
                    }
                }
            }
        }
        return { nodes, edges };
    }
    private addNode(node: T): void {
        this.graph[node.id] = { node, neighbors: new Set() };
    }
    private addEdge(edge: Edge<T>): void {
        this.graph[edge.n1.id].neighbors.add(edge.n2);
        this.graph[edge.n2.id].neighbors.add(edge.n1);
    }
    public getAliveNeighborCount(n: T): number {
        return Array.from(this.graph[n.id].neighbors).filter((n) => n.isAlive)
            .length;
    }
}
