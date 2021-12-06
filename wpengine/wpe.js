import dotenv from 'dotenv'
import LegacyAdminEmailUpdate from './lib/actions/LegacyAdminEmailUpdate.js'
dotenv.config()

// constants
const args = process.argv;

switch (args[2]) {
    case 'WordpressLegacyEmailUpdate':
        const WPEngineAccounts = ['synergema','laphroaig']
        await LegacyAdminEmailUpdate(WPEngineAccounts, 'grafik.com')
        break;
    default:
        console.log('invalid argument')
}

