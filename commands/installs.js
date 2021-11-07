const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const inquirer = require('inquirer');
const auth = require('../auth/auth');

const listInstalls = async () => {
    const data = await fetch(`https://api.wpengineapi.com/v1/installs`, {
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

const newInstall = async () => {

}

const installs = () => {
    // Add prompts here
}

module.exports = { installs, listInstalls, newInstall };