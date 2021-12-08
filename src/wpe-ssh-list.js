#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author thesbx
 * @license MIT
 *
 */

import { program } from 'commander';
import {SSH} from './commands/ssh.js';

const ssh = new SSH();

program
    .argument('[limit]', 'limit results')
    .action((limit) => {
        ssh.showKeys(limit)
    })

program.parse(process.argv)