#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author thesbx
 * @license MIT
 *
 */

import WPE from '../providers/wpengine/wpe.js';
import Accounts from './accounts.js';
import inquirer from 'inquirer';
import * as fs from 'fs';
import { homedir } from 'os';

/**
 * Handles the logic for the users CLI
 * @class Users
 */
export default class Users {
    wpe = new WPE();
    accounts = new Accounts();

    constructor() {}
    
    /**
     * Fetches a list of users.
     * @param {*} emailIndex 
     * @param {*} file 
     */
    listUsers = async (emailIndex, file) => {
        await this.accounts.listAccounts().then((accounts) =>
            this.wpe.fetchUsers(accounts, emailIndex, file)
        );
    }
    
    /**
     * Creates a file at the home directory of the users OS.
     * @param {*} name File Name
     */
    createFile = async (name) => {
        const file = `${homedir}/${name}.csv`
        fs.writeFile(file, '', (err) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(`filecreated at ${file}`)
            }
        });
        
    }
    
    /**
     * Executes the users CLI
     */
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