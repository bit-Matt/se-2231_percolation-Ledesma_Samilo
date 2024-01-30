import * as readlineSync from 'readline-sync';
import Percolation from './classes/Percolation';
import PercolationStats from './classes/PercolationStats';

//purely for display lng gd 
function printGrid(percolation: Percolation) {
  for (let i = 0; i < percolation.rows; i++) {
     console.log(percolation.grid[i].join(' '));
  }
}

function main() {
  const n = readlineSync.questionInt('Enter the size of the grid (n): ');
  const trials = readlineSync.questionInt('Enter the number of trials: ');
  const percolation = new Percolation(n);
  let numOpenSites = 0;
 
  while (true) {
    console.log('\nOptions:');
    console.log('1. View current grid');
    console.log('2. Open a random site');
    console.log('3. Open sites until the system percolates');
    console.log('4. Check if the system percolates');
    console.log('5. Run Percolation Statistics');
    console.log('6. Exit program');
 
    const choice = readlineSync.question('Enter your choice: ');
 
    switch (parseInt(choice)) {
      case 1:
        printGrid(percolation);
        break;

      case 2:
        percolation.openRandomSite();
        numOpenSites++;
        console.log('Opening a random site.');
        break;

      case 3:
        while (!percolation.percolates()) {
          percolation.openRandomSite();
          // printGrid(percolation);
          // console.log('Opening a random site.')
          numOpenSites++;
        }
        printGrid(percolation);
        console.log(`System percolated after ${numOpenSites} attempts.`);
        console.log(percolation.openSites);
        break;

      case 4:
        console.log('Does the system percolate?', percolation.percolates());
        break;

      case 5:
        const stats = new PercolationStats(n, trials);
        console.log('\nMean:', stats.mean());
        console.log('Standard Deviation:', stats.stddev());
        // console.log('Array of Open Sites:', stats.arrOpenSites);
        // console.log('Array of Percolation Thresholds:', stats.arrPercThresh);
        console.log('95% Confidence Interval:', [stats.confidenceLo(), stats.confidenceHi()]);
        break;

      case 6:
        console.log('\nExiting program.');
        process.exit(0);

      default:
        console.log('Invalid choice. Please enter a valid option.');
    }
  }
} 

main();
