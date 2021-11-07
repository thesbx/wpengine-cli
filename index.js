#! /usr/bin/env node
const { program } = require('commander')
const sites = require('./commands/sites');
const installs = require('./commands/installs');
const acc = require('./commands/accounts');
const auth = require('./auth/auth');

// Auth command
program
    .command('auth')
    .description('authenticate with WP Engine')
    .action(auth.signin)

// Sites command
program
    .command('sites')
    .description('manage sites')
    .action(sites.sites)

// Accounts command
program
    .command('accounts')
    .description('manage accounts')
    .action(acc.accounts)

// Installs command
program
    .command('installs')
    .description('manage installs')
    .action(installs.installs)

program.parse()