import Percolation from "./Percolation";

export default class PercolationStats {
  size: number;
  numTrials: number;
  arrPercThresh: number[] = [];
  // arrOpenSites: number[] = [];

  // perform independent trials on an n-by-n grid
  constructor(n: number, trials: number) {
    if (n <= 0 || trials <= 0) {
      throw new Error("n and trials must be greater than 0");

    } else {
      this.size = n;
      this.numTrials = trials;
    };

    for (let i = 0; i < trials; i++) {
      const percolation = new Percolation(n);

      while (!percolation.percolates()) {
        percolation.openRandomSite();
      }
      // this.arrOpenSites.push(percolation.openSites);
      this.arrPercThresh.push(percolation.numberOfOpenSites() / (n * n));
    }
    
  }

  // sample mean of percolation threshold
  mean(): number {
    let totalPercThresh = this.arrPercThresh.reduce((a, b) => a + b, 0);
    return totalPercThresh / this.numTrials;
  }

  // sample standard deviation of percolation threshold
  stddev(): number {  
    let xTotal = 0;

    for (let i = 0; i < this.numTrials; i++) {
      let x = this.arrPercThresh[i] - this.mean();
      let y = x ** 2;
      xTotal += y;
    }
    let stddev = Math.sqrt(xTotal / (this.numTrials - 1));
      return stddev;
  }

  // low endpoint of 95% confidence interval
  confidenceLo(): number {
    return this.mean() - ((1.96 * this.stddev()) / Math.sqrt(this.numTrials));
  }
  
  // high endpoint of 95% confidence interval
  confidenceHi(): number {
    return this.mean() + ((1.96 * this.stddev()) / Math.sqrt(this.numTrials));
  }
}
 