#! /usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer');
const sites = require('./commands/sites');
const installs = require('./commands/installs');
const acc = require('./commands/accounts');
const auth = require('./auth/auth');

program
    .command('sites')
    .description('manage sites')
    .action(sites.sites)

program
    .command('accounts')
    .description('manage accounts')
    .action(acc.accounts)

program
    .command('installs')
    .description('manage installs')
    .action(installs.installs)

program
    .command('auth')
    .description('authenticate with WP Engine')
    .action(auth.signin)




program.parse()