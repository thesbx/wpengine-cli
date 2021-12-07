import dotenv from 'dotenv'
import LegacyAdminEmailUpdate from './lib/actions/LegacyAdminEmailUpdate.js'
dotenv.config()

// constants
export default class WPE {
    args = process.argv;

    fetchUsers = async (sites, ...emailIndex, file) => {
        switch (args[2]) {
            case 'WordpressLegacyEmailUpdate':
                const WPEngineAccounts = emailIndex
                await LegacyAdminEmailUpdate(WPEngineAccounts, sites, file)
                break;
            default:
                console.log('invalid argument')
        }
    }
}
