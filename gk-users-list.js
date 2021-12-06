#! /usr/bin/env node
const { program } = require('commander')
import { Users } from './commands/users'

program
    .action(Users.users())

program.parse(process.argv)