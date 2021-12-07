#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author Matt Miller
 * @license MIT
 *
 */

import { program } from 'commander';
import Sites from './commands/sites.js';
import Installs from './commands/installs.js';
import Accounts from './commands/accounts.js';
import Auth from './auth/auth.js';

const auth = new Auth();
const sites = new Sites();
const accounts = new Accounts();
const installs = new Installs();

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
    .action(accounts.accounts)

// Installs command
program
    .command('installs')
    .description('manage installs')
    .action(installs.installs)

// SSH command
program
    .command('ssh', 'manage ssh keys')

// Users
program
    .command('users', 'Manage users on installs')

program.action(() => {
    program.help()
})

program.showSuggestionAfterError();

program.parse(process.argv)