const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const inquirer = require('inquirer');
const auth = require('../auth/auth');

const listAccounts = async () => {
    const data = await fetch(`https://api.wpengineapi.com/v1/accounts`, {
        method: 'GET',
        headers: { 'Authorization': auth.authorization },
    })
    const json = await data.json();

    const accounts = json.results.map(data => {
        return {
            name: data.name,
            value: data.id
        };
    })
    return accounts;
}

const accounts = () => {
    listAccounts().then(
        accounts => {
            inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'Choose an account',
                    name: 'account',
                    choices: accounts
                }
            ])
            .then((answers) => {
                console.log(answers.account);
            })
            .catch((error) => {
                if (error.isTtyError) {
                  // Prompt couldn't be rendered in the current environment
                } else {
                  // Something else went wrong
                }
            });      
        }
    )
 }

module.exports = {accounts, listAccounts};