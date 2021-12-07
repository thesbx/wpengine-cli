#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author Matt Miller
 * @license MIT
 *
 */

import { program } from 'commander';
import SSH from './commands/ssh.js';

const ssh = new SSH();

program
    .action(ssh.addKeys)