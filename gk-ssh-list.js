#! /usr/bin/env node
const { program } = require('commander')
const ssh = require('./commands/ssh');

program
    .argument('[limit]', 'limit results')
    .action((limit) => {
        ssh.showKeys(limit)
    })

program.parse(process.argv)