#! /usr/bin/env node
const { program } = require('commander')
const chalk = require('chalk');

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
