#! /usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer');
const sites = require('./commands/sites');
const installs = require('./commands/installs');

program
    .command('sites')
    .description('Sites API Endpoint')
    .action(sites.sites)

program
    .command('accounts')
    .description('Accounts API Endpoint')
    .action(acc.accounts)

program
    .command('installs')
    .description('Installs API Endpoint')
    .action(installs.accounts)




program.parse()