const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const inquirer = require('inquirer');
const auth = require('../auth/auth');
const accounts = require('../commands/accounts');

const getSites = async (limit) => {
    if (limit < 1) {
        const data = await fetch(`https://api.wpengineapi.com/v1/sites`, {
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

const addSite = async (body) => {
    const response = await fetch(`https://api.wpengineapi.com/v1/sites`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 
            'Authorization': auth.authorization,
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
    })
    const data = await response.json();
    console.log("Site successfully created!", data);
}

function updateSite(id, {options}) {

}

function deleteSite(id) {

}


const sites = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'Select an action',
            name: 'actions',
            choices: [
                'Add site',
                'Show all',
                'Get by ID',
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
                                getSiteById(siteId.siteList).then(
                                    data => {
                                        inquirer
                                        .prompt([
                                            {
                                                type: 'list',
                                                message: 'Select a site',
                                                name: 'options',
                                                choices: [
                                                    "View installs",
                                                    "Edit site",
                                                    "Delete site"
                                                ]
                                            }
                                        ])
                                        .then((siteId) => {
                                            if (siteId.options[0]) {
                                                console.log(data.installs);
                                            } else if (siteId.options[1]) {
                                                // Edit site
                                            } else if (siteId.options[2]) {
                                                // Remove site
                                            }
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
        } else if (answers.actions === 'Add site') {
            accounts.listAccounts().then(
                accounts => {
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: 'Choose an account',
                            name: 'accountId',
                            choices: accounts
                        },
                        {
                            type: 'input',
                            name: 'siteName',
                            message: 'Enter a site name'
                        }
                    ])
                    .then((answers) => {
                        addSite(
                            {
                                name: answers.siteName, 
                                account_id: answers.accountId
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
            )      
        }
    })
}



module.exports = { sites, getSites, addSite, getSiteById, updateSite };