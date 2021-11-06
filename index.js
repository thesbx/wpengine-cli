#! /usr/bin/env node

const { program } = require('commander')
const inquirer = require('inquirer');

const auth = require('./auth/auth')

const wpe_auth = [
    {
        type: 'input',
        message: 'Enter your WP Engine API username:',
        name: 'username'
    },
    {
        type: 'password',
        message: 'Enter your WP Engine API password:',
        name: 'password',
        mask: '*'
    }
];

const engine = [
    {
        type: 'list',
        message: 'Select the the account where this site shoud live',
        name: 'cms',
        choices: [
            'Basic WordPress',
            'Headless WordPress'
        ]
    },
    {
        type: 'input',
        message: 'Enter site name'
    }
];

if (!auth.getEnv('username')) {
    inquirer.prompt(wpe_auth).then((answers) => {
        // auth.setEnv('WPENGINE_USER_ID', answers.username);
        // auth.setEnv('WPENGINE_PASSWORD', answers.password);
        // auth.fetchInstalls();
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
  });
} else {
    inquirer.prompt(engine).then((answers) => {
  
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
  });
}

program.parse()