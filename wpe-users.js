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
    .command('add', 'add users').alias('a')
    
program
    .command('list', 'create a .csv of users').alias('l') 

program.action(() => {
    program.help()
})

program.addHelpText('after', `
Description:
List will generate a .csv of all users matching specifc arguments.

Example usage:
${chalk.green('wpe users add')}
${chalk.green('wpe users list')}
`)

program.parse(process.argv)
