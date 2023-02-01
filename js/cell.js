export default class Cell {
    constructor(rowNum, colNum, sideLengeh) {
        this.isAlive = false;
        this.div = document.createElement("div");
        this.div.id = `(${rowNum},${colNum})`;
        this.div.className = "cell";
        this.div.style.width = `${sideLengeh}%`;
    }
    get id() {
        return this.div.id;
    }
    get position() {
        let pos = this.div.id.replace(/\(+|\)+/g, "").split(",");
        return { row: parseInt(pos[0]), col: parseInt(pos[1]) };
    }
    switchState() {
        if (this.isAlive)
            this.div.classList.remove("alive");
        else
            this.div.classList.add("alive");
        this.isAlive = !this.isAlive;
    }
}
