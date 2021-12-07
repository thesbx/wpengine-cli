#! /usr/bin/env node
import { program } from 'commander'
import Users from './commands/users.js'

const users = new Users();

program
    .action(users.users)

program.parse(process.argv)