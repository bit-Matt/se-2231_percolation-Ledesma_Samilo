import * as readlineSync from 'readline-sync';
import Percolation from './classes/Percolation';

//purely for display lng gd 
function printGrid(percolation: Percolation) {
  for (let i = 0; i < percolation.rows; i++) {
    console.log(percolation.grid[i].join(' '));
  }
}

function main() {
  const n = readlineSync.questionInt('Enter the size of the grid (n): ');
  const percolation = new Percolation(n);

  while (true) {
    console.log('\nOptions:');
    console.log('1. View current grid');
    console.log('2. Exit');

    const choice = readlineSync.question('Enter your choice: ');

    switch (parseInt(choice)) {
      case 1:
        printGrid(percolation);
        break;

      case 2:
        console.log('Exiting program.');
        process.exit(0);

      default:
        console.log('Invalid choice. Please enter a valid option.');
    }
  }
}

main();
