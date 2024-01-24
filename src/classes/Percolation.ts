//🟦⬜⬛

export default class Percolation {
  rows: number;
  columns: number;
  grid: string[][];

    // creates n-by-n grid, with all sites initially blocked
  constructor(n: number) {
    this.rows = n;
    this.columns = n;
    this.grid = this.initializeGrid(n);
  }

  private initializeGrid(n: number): string[][] {
    const grid = new Array<string[]>(n);
    for (let i = 0; i < n; i++) {
      grid[i] = new Array<string>(n).fill("⬛");
    }
    return grid;
  }

  // opens the site (row, col) if it is not open already
  open() {
    const row: number = Math.floor(Math.random() * this.rows);
    const col: number = Math.floor(Math.random() * this.columns);
    this.grid[row][col] = "⬜";

    if (this.grid[row] === this.grid[0] && this.grid[row][col] === "⬜") {
      this.grid[row][col] = "🟦";
    }

    return [row, col];
  }

  // is the site (row, col) open?
  isOpen(row: number, col: number): boolean {
    if (this.grid[row][col] === "⬛" ) {
      return false;
    }
    return true;
  }

  // is the site (row, col) full?
  isFull(row: number, col: number): boolean {
    // if (this.grid[row] === this.grid[0] && this.grid[row][col] === "⬜") {
    //   this.grid[row][col] = "🟦";
    // }

    if (this.grid[row][col] === "🟦") {
      return true;
    }
    return false;
  }

  // returns the number of open sites
  numberOfOpenSites(): number {
    return 0;
  }

  // does the system percolate?
  percolates(): boolean {
    return true;
  }
}
