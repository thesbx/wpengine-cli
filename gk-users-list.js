#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author Matt Miller
 * @license MIT
 *
 */

import { program } from 'commander'
import Users from './commands/users.js'

const users = new Users();

program
    .action(users.users)

program.parse(process.argv)