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
    if (getEnv('WPENGINE_USER_ID') === 'WPENGINE_USER_ID') {
        return true;
    } else {
        return false;
    }
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

 async function setEnv(key, value) {
    fs.readFile(envPath, 'utf8', function (err, data) {
        if (err) {
            return console.warn(err);
        }
        const result = parse(data);
        result[key] = value;
        fs.appendFile(envPath, stringify(result), function (err) {
            if (err) {
                return console.log(err);
            }
        })

    });
}

async function register() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "account_id",
                message: "Enter your account ID"
            },
            {
                type: "password",
                name: "password",
                message: "Enter your account password",
                mask: "*"
            }
        ])
        .then(async (answer) => {
            await setEnv('WPENGINE_USER_ID', answer.account_id)
            await setEnv('WPENGINE_PASSWORD', answer.password)
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
                    console.log('Login again')
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