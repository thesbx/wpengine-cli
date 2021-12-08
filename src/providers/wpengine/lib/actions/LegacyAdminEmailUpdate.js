import {WpEngineClient, WPEngineAccounts, WPEngineSites} from '../WpEngineClient.js'
import {execSync} from 'child_process'
import ObjectsToCsv from 'objects-to-csv'

export default async function LegacyAdminEmailUpdate(wpEngineAccounts, emailIndex, file) {
    const client = WpEngineClient({
        BASE_URL: 'https://api.wpengineapi.com/v1/',
        WPE_USERNAME: process.env.WPENGINE_USER_ID,
        WPE_PASSWORD: process.env.WPENGINE_PASSWORD
    })

    // 'synergema'
    const accounts = await WPEngineAccounts(client, wpEngineAccounts)
    const sites = await WPEngineSites(client, accounts)

    let parsed = []
    sites.forEach(site => site.installs.map(install => {
        if (install.environment === 'production') {
            const command = `ssh -o StrictHostKeyChecking=no -i ${process.env.SSH_PATH} ${install.name}@${install.name}.ssh.wpengine.net 'wp user list --role='administrator' --format=json'`
            console.log(`📘: connected to ${install.name}...`);
            try {
                const accounts = JSON.parse(execSync(command));
                // check for 2120 creative
                let oldAccounts = accounts.filter(account => account.user_email.indexOf(emailIndex) > -1)

                if (oldAccounts.length) {

                    console.log(`📗: found ${oldAccounts.length} accounts with index ${emailIndex}`);

                    oldAccounts.forEach(account => {
                        parsed.push({
                            "id": install.id,
                            "siteName": install.name,
                            "wpEngineUrl": install.cname,
                            ...account
                        })
                        
                    })
                    

                } else {
                    console.log(`📓: found no accounts with index ${emailIndex}`);
                }
                

            } catch (error) {
                console.error(`📙: ${command}`)
                console.error(`📕: ${error}`)
            }
        }
    }))

    // connect to sites via ssh and get wp users using wpcli
    const csv = new ObjectsToCsv(parsed)
    csv.toDisk(file, parsed)
    console.log(`📗: successfully created ${file}`);
}