#! /usr/bin/env node
const fs = require('fs')
require('dotenv').config()
const {
    parse,
    stringify
} = require('envfile');
const envPath = '.env';
const inquirer = require('inquirer');
const chalk = require('chalk');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const WPENGINE_PASSWORD = process.env.WPENGINE_PASSWORD;
const WPENGINE_USER_ID = process.env.WPENGINE_USER_ID;

const authorization = "Basic " + Buffer.from(WPENGINE_USER_ID + ":" + WPENGINE_PASSWORD).toString('base64');


function authenticated() {
    if (getEnv('WPENGINE_USER_ID') && getEnv('WPENGINE_PASSWORD') ) {
        return true;
    }
    
    return false;
}
/**
 * 
 * @param {string} key 
 * //Function to get value from env
 */
 function getEnv(key) {
    return process.env[key];
}

/**
 * 
 * @param {string} key 
 * @param {string} value 
 * //Function to set environment variables.
 */

 async function setEnv(creds) {
    fs.readFile(envPath, 'utf8', function (err) {
        if (err) {
            fs.writeFile(envPath, creds, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        } else {
            fs.writeFile(envPath, creds, (err) => {
                if (err) {
                    return console.log(err);
                }
            })
        }


    });

}

async function register() {
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
            }
        ])
        .then(async (answer) => {
            await setEnv(`WPENGINE_USER_ID=${answer.account_id}\nWPENGINE_PASSWORD=${answer.password}`);
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

const signin = async () => {
    // Add prompts here
    if (authenticated()) {
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
                    register();
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
        register();
    } 
    
}

module.exports = { signin, setEnv, getEnv, authorization, WPENGINE_PASSWORD, WPENGINE_USER_ID, authenticated };