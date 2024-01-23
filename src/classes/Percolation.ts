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
  open(row: number, col: number) {
    return;
  }

  // is the site (row, col) open?
  isOpen(row: number, col: number): boolean {
    return true;
  }

  // is the site (row, col) full?
  isFull(row: number, col: number): boolean {
    return true;
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
