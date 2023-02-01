export default class Cell {
    public isAlive: boolean;
    public div: HTMLElement;

    public constructor(rowNum: number, colNum: number, sideLengeh: number) {
        this.isAlive = false;
        this.div = document.createElement("div");
        this.div.id = `(${rowNum},${colNum})`;
        this.div.className = "cell";
        this.div.style.width = `${sideLengeh}%`;
    }
    public get id(): string {
        return this.div.id;
    }
    public get position(): { row: number; col: number } {
        let pos = this.div.id.replace(/\(+|\)+/g, "").split(",");
        return { row: parseInt(pos[0]), col: parseInt(pos[1]) };
    }
    public switchState(): void {
        if (this.isAlive) this.div.classList.remove("alive");
        else this.div.classList.add("alive");
        this.isAlive = !this.isAlive;
    }
}
