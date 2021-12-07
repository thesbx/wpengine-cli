#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author Matt Miller
 * @license MIT
 *
 */

import { readFile, writeFile } from 'fs';
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
    async authenticated() {
        if (this.getEnv('WPENGINE_USER_ID') && this.getEnv('WPENGINE_PASSWORD') ) {
            return true;
        }
        
        return false;
    }

    /**
     * Retrieves data from the environment variables.
     * @param {*} key 
     * @returns .env data
     * @since 1.0.0
     */
     getEnv(key) {
        return process.env[key];
    }
    
    /**
     * Sets environment variables.
     * @param {string} key 
     * @param {string} value 
     * @since 1.0.0
     */    
     async setEnv(creds) {
        readFile(this.envPath, 'utf8', function (err) {
            if (err) {
                writeFile(this.envPath, creds, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                writeFile(this.envPath, creds, (err) => {
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
                    message: "Enter the path to your public ssh key."
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
                        this.register
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
            this.register
        } 
        
    }
}
