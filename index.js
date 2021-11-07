#! /usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer');
const sites = require('./commands/sites');
const acc = require('./commands/accounts');

program
    .command('sites')
    .description('Sites API Endpoint')
    .action(sites.sites)

program
    .command('accounts')
    .description('Accounts API Endpoint')
    .action(acc.accounts)




program.parse()