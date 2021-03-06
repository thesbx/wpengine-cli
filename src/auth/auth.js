#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author Matt Miller
 * @license MIT
 *
 */

import { readFile, writeFile } from 'fs';
import { validate as uuidValidate } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();
import inquirer from 'inquirer';
import chalk from 'chalk';

/**
 * Handles the logic for the auth CLI
 * @class Auth
 * @since 1.0.0
 */
export default class Auth {

    envPath = '.env';
    WPENGINE_PASSWORD = process.env.WPENGINE_PASSWORD;
    WPENGINE_USER_ID = process.env.WPENGINE_USER_ID;
    
    authorization = "Basic " + Buffer.from(this.WPENGINE_USER_ID + ":" + this.WPENGINE_PASSWORD).toString('base64');

    constructor() { }    
    
    /**
     * Returns a boolean response to determine if the user has authenticated before or not.
     * @returns BOOLEAN
     * @since 1.0.0
     */
    authenticated() {
        const valid = uuidValidate(this.WPENGINE_USER_ID)
        return valid;
    }
    
    /**
     * Sets environment variables.
     * @param {string} key 
     * @param {string} value 
     * @since 1.0.0
     */    
     async setEnv(creds) {
        readFile('.env', 'utf8', function (err) {
            if (err) {
                writeFile('.env', creds, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                writeFile('.env', creds, (err) => {
                    if (err) {
                        return console.log(err);
                    }
                })
            }
    
    
        });
    
    }
    
    /**
     * Executes the registration CLI.
     * @since 1.0.0
     */
    register = async () => {
        inquirer
        .prompt([
            {
                type: "input",
                name: "account_id",
                message: "Enter your API username",
                validate(value) {
                    const pass = value.match(
                        /([0-9A-Z]{8})(-)([0-9A-F]{4})(-)([0-9A-Z]{4})(-)([0-9A-Z]{4})(-)([0-9A-Z]{12})/i
                    );
                    if (pass) {
                      return true;
                    }
                
                    return 'Please enter a valid username';
                },
            },
            {
                type: "password",
                name: "password",
                message: "Enter your API password",
                mask: "*"
            },
            {
                type: "input",
                name: "ssh",
                message: "Enter the path to your public ssh key.",
                default: '~/.ssh/id_rsa'
            }
        ])
        .then(async (answer) => {
            await this.setEnv(`WPENGINE_USER_ID=${answer.account_id}\nWPENGINE_PASSWORD=${answer.password}\nSSH_PATH=${answer.ssh}`);
            console.log('Credentials set!')
        })
        .catch((error) => {
            if (error.isTtyError) {
              // Prompt couldn't be rendered in the current environment
            } else {
              // Something else went wrong
            }
        });
    }
    
    /**
     * Executes the signin CLI
     * @since 1.0.0
     */
    signin = async () => {
        // Add prompts here
        if (this.authenticated()) {
            inquirer
            .prompt([
                    {
                        type: 'confirm',
                        name: "reAuth",
                        message: chalk.blue("Would you like to re-authenticate?")
                    }
                ])
                .then((answer) => {
                    if (answer.reAuth) {
                        this.register()
                    } else {
                        console.log('Enter a new command')
                    }
                })
                .catch((error) => {
                    if (error.isTtyError) {
                      // Prompt couldn't be rendered in the current environment
                    } else {
                      // Something else went wrong
                    }
                });
        } else {
            this.register()
        } 
        
    }
}
