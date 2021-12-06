#! /usr/bin/env node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import { WPE } from '../providers/wpengine/wpe';
const inquirer = require('inquirer');
const fs = require('fs');

export class Users {
    
    listUsers = async (sites, ...emailIndex, file) => {
        WPE.fetchUsers(sites, ...emailIndex, file);
    }
    
    createFile = async (file) => {
        fs.writeFile(file, '', (err) => {
            if (err) {
                console.log(err);
            }
        });
        
    }
    
    users = () => {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter a file name for the generated CSV',
                name: 'file',
            }
        ])
        .then((answers) => {
            await createFile(answers.file);
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