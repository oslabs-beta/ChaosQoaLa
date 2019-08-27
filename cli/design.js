/* eslint-disable no-console */
import { textSync } from 'figlet';
import { magentaBright } from 'chalk';

console.log(
  magentaBright(
    textSync('ChaosQoaLa', { horizontalLayout: 'full' }),
  ),
);
