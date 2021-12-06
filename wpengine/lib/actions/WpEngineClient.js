import axios from "axios";
export function WpEngineClient(config) {
    // check for requirements
    if (!config?.BASE_URL)
        return Promise.reject('config.BASE_URL Required')
    if (!config?.WPE_USERNAME)
        return Promise.reject('config.WPE_USERNAME Required')
    if (!config?.WPE_PASSWORD)
        return Promise.reject('config.WPE_PASSWORD Required')

    // set up base axios
    return axios.create({
        baseURL: config.BASE_URL,
        auth: {
            username: config.WPE_USERNAME,
            password: config.WPE_PASSWORD
        }
    })
}

export async function WPEngineAccounts(client, limitByName = []) {
    const accounts = await client.get('/accounts')

    if (limitByName.length > 0) {
        return accounts.data.results.filter(account => {
            return limitByName.indexOf(account.name) > -1
        })
    }

    return accounts.data.results
}

export async function WPEngineSites(client, accounts = []) {
    // get all sites for each account
    if (accounts.length > 0) {
        const accountSites = accounts.map(account => {
            return client.get(`/sites?account_id=${account.id}`)
        })

        const resolved = await Promise.all(accountSites);
        return resolved.map(resolve => {
            return resolve.data.results
        }).flat()
    }

    // return all results
    const sites = await client.get('/sites')
    return sites.data.results
}