const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const inquirer = require('inquirer');
const auth = require('../auth/auth');

const getSites = async (limit) => {
    if (limit < 1) {
        const data = await fetch(`https://api.wpengineapi.com/v1/sites`, {
            method: 'GET',
            headers: { 'Authorization': auth.authorization },
        })
        const json = await data.json();
    
        const sites = json.results.map(data => {
            return data;
        })
        return sites;   
    } else {
        const data = await fetch(`https://api.wpengineapi.com/v1/sites?limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': auth.authorization },
        })
        const json = await data.json();
        
        const sites = json.results.map(data => {
            return {
                name: data.name,
                value: data.id
            };
        })
        return sites;
    }
}




const getSiteById = async (id) => {
    const data = await fetch(`https://api.wpengineapi.com/v1/sites/${id}`, {
        method: 'GET',
        headers: { 'Authorization': auth.authorization },
    })
    const json = await data.json();
    return json;
}

function addSite(name, accountId) {

}

function updateSite(id, {options}) {

}

function deleteSite(id) {

}

const runInquirer = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Select an action',
            name: 'actions',
            choices: [
                'Show all',
                'Get by ID',
                'Add site',
                'Update site',
                'Delete site'
            ]
        }
    ])
    .then((answers) => {
        if (answers.actions === 'Show all') {
            inquirer
            .prompt([
                {
                    type: 'number',
                    message: 'How many sites would you like to list',
                    name: 'siteLimit',
                    default: 100
                }
            ])
            .then((limit) => {
                getSites(limit.siteLimit).then(
                    data => {
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    message: 'Select a site',
                                    name: 'siteList',
                                    choices: data
                                }
                            ])
                            .then((siteId) => {
                                console.log(siteId.siteList)
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
            })
            .catch((error) => {
                if (error.isTtyError) {
                  // Prompt couldn't be rendered in the current environment
                } else {
                  // Something else went wrong
                }
            });
        } else if (answers.actions === 'Get by ID') {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'Enter the sites unique ID',
                        name: 'site_by_id'
                    }
                ])
                .then((id) => {
                    getSiteById(id.site_by_id).then(
                        data => {
                            console.log(data);
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
    })
}



module.exports = {runInquirer};