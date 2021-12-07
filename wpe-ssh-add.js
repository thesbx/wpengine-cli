#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author thesbx
 * @license MIT
 *
 */

import { program } from 'commander';
import SSH from './commands/ssh.js';

const ssh = new SSH();

program
    .action(ssh.addKeys)