//🟦⬜⬛
import { QuickUnionUF } from "./quickUnion";

export default class Percolation {
  rows: number;
  columns: number;
  grid: string[][];
  openSites: number;
  uf: QuickUnionUF;

  // creates n-by-n grid, with all sites initially blocked
  constructor(n: number) {
    this.rows = n;
    this.columns = n;
    this.grid = this.initializeGrid(n);
    this.openSites = 0;
    this.uf = new QuickUnionUF(n * n);
  }

  //display grid - kinda ui only + setting close site value (black square)
  private initializeGrid(n: number): string[][] {
    const grid = new Array<string[]>(n);
    for (let i = 0; i < n; i++) {
      grid[i] = new Array<string>(n).fill("⬛");
    }
    return grid;
  }

  // opens the site (row, col) if it is not open already
  open(row: number, col: number) {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
       throw new Error('Row or column index out of bounds');
    }
   
    if (this.isOpen(row, col)) { // ---- FIX: if site is already open, open a different site ---- // 
       return;
    }
   
    const index = row * this.columns + col;
    this.grid[row][col] = "⬜";
    this.openSites++;
   
    if (row === 0) {
       this.uf.union(0, index);
    }
   
    if (row > 0 && this.isOpen(row - 1, col)) {
       this.uf.union(index, (row - 1) * this.columns + col);
    }
    if (row < this.rows - 1 && this.isOpen(row + 1, col)) {
       this.uf.union(index, (row + 1) * this.columns + col);
    }
    if (col > 0 && this.isOpen(row, col - 1)) {
       this.uf.union(index, row * this.columns + col - 1);
    }
    if (col < this.columns - 1 && this.isOpen(row, col + 1)) {
       this.uf.union(index, row * this.columns + col + 1);
    }
   }

  openRandomSite() {
    const row: number = Math.floor(Math.random() * this.rows);
    const col: number = Math.floor(Math.random() * this.columns);
    this.open(row, col);
  }

  // is the site (row, col) open?
  isOpen(row: number, col: number): boolean {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
      throw new Error("Row or column index out of bounds");
    }

    return this.grid[row][col] === "⬜";
  }

  // is the site (row, col) full?
  isFull(row: number, col: number): boolean {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.columns) {
       throw new Error('Row or column index out of bounds');
    }
   
    const isFull = this.uf.connected(0, row * this.columns + col);
    if (isFull) {
       this.grid[row][col] = "🟦";
    }
   
    return isFull;
   }

  // returns the number of open sites
  numberOfOpenSites(): number {
    return this.openSites;
  }

  // does the system percolate?
  percolates(): boolean {
    return this.uf.connected(0, this.rows * this.columns - 1);
  }
}
