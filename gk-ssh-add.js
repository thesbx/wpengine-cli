const { program } = require('commander')
const ssh = require('./commands/ssh');

program
    .action(ssh.addKeys)