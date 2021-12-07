#! /usr/bin/env node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import WPE from '../providers/wpengine/wpe.js';
import * as inquirer from 'inquirer';
import * as fs from 'fs';

export default class Users {
    wpe = new WPE();
    constructor() {}
    
    listUsers = async (sites, emailIndex, file) => {
        this.wpe.fetchUsers(sites, emailIndex, file);
    }
    
    createFile = async (file) => {
        fs.writeFile(file, '', (err) => {
            if (err) {
                console.log(err);
            }
        });
        
    }
    
    users = async () => {
        inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter a file name for the generated CSV',
                name: 'file',
            }
        ])
        .then((answers) => {
            createFile(answers.file);
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