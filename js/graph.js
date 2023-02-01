export default class Graph {
    constructor(grid) {
        this.graph = {};
        const { nodes, edges } = this.gridToGraphInfo(grid);
        nodes.forEach((node) => this.addNode(node));
        edges.forEach((edge) => this.addEdge(edge));
    }
    gridToGraphInfo(grid) {
        const height = grid.length;
        const width = grid[0].length;
        let nodes = [];
        let edges = [];
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
    addNode(node) {
        this.graph[node.id] = { node, neighbors: new Set() };
    }
    addEdge(edge) {
        this.graph[edge.n1.id].neighbors.add(edge.n2);
        this.graph[edge.n2.id].neighbors.add(edge.n1);
    }
    getAliveNeighborCount(n) {
        return Array.from(this.graph[n.id].neighbors).filter((n) => n.isAlive)
            .length;
    }
}
