#! /usr/bin/env node
const { program } = require('commander')
const inquirer = require('inquirer');
const sites = require('./commands/sites');

program
    .command('sites')
    .description('Sites API Endpoint')
    .option('-l', '--list <limit>', 'List sites from WP Engine')
    .action(sites.runInquirer)




program.parse()