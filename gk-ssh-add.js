#! /usr/bin/env node
import { program } from 'commander';
import SSH from './commands/ssh.js';

const ssh = new SSH();

program
    .action(SSH.addKeys)