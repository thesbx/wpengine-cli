#! /usr/bin/env node
import { program } from 'commander'
import Users from './commands/users.js'

program
    .action(Users.users)

program.parse(process.argv)