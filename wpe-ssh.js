#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author thesbx
 * @license MIT
 *
 */

import { program } from 'commander';
import chalk from 'chalk';

program
    .command('add', 'add an ssh key').alias('a')
    
program
    .command('list', 'list your ssh keys').alias('l') 

program.action(() => {
    program.help()
})

program.addHelpText('after', `
Example usage:
${chalk.green('grafik ssh add')}
${chalk.green('grafik ssh list')}
`)

program.parse(process.argv)
