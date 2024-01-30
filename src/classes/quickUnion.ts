// Note: Quick Union Algorithm with Weighted Tree and Path Compression

export class QuickUnionUF {
  ids: number[];
  sz: number[];

  constructor(N: number) {
    this.ids = [];
    this.sz = [];

    for (let i = 0; i < N; i++) {
      this.ids[i] = i;
    }
  }

  root(i: number) {
    while (i !== this.ids[i]) {
      this.ids[i] = this.ids[this.ids[i]]; // Path Compression
      i = this.ids[i];
    }
    return i;
  }

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q);
  }

  union(p: number, q: number) {
    let i: number = this.root(p);
    let j: number = this.root(q);

    if (i === j) return;

    if (this.sz[i] < this.sz[j]) { // Weighted Tree
      this.ids[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.ids[j] = i;
      this.sz[i] += this.sz[j];
    }
  }
}
