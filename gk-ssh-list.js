#! /usr/bin/env node
import { program } from 'commander';
import SSH from './commands/ssh.js';

const ssh = new SSH();

program
    .argument('[limit]', 'limit results')
    .action((limit) => {
        ssh.showKeys(limit)
    })

program.parse(process.argv)