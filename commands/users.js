#! /usr/bin/env node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import WPE from '../providers/wpengine/wpe.js';
import Accounts from './accounts.js';
import inquirer from 'inquirer';
import * as fs from 'fs';

export default class Users {
    wpe = new WPE();
    accounts = new Accounts();
    constructor() {}
    
    listUsers = async (emailIndex, file) => {
        await this.accounts.listAccounts().then((accounts) =>
            this.wpe.fetchUsers(accounts, emailIndex, file)
        );
    }
    
    createFile = async (file) => {
        fs.open(`${file}`, 'w', (err, f) => {
            if (err) {
                throw err;
            }
            return f;
        });
        
    }
    
    users = async () => {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter a file name for the generated CSV:',
                name: 'file',
            },
            {
                type: 'input',
                message: 'Enter an domain to filter users by:',
                name: 'email'
            }
        ])
        .then((answers) => {
            this.createFile(answers.file).then((data) => {
                this.listUsers(answers.email, answers.file)
            }
                
            )
            
        })
        .catch((error) => {
            if (error.isTtyError) {
              // Prompt couldn't be rendered in the current environment
            } else {
              // Something else went wrong
            }
        });
        
    }
}