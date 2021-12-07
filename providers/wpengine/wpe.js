import dotenv from 'dotenv'
import LegacyAdminEmailUpdate from './lib/actions/LegacyAdminEmailUpdate.js'
dotenv.config()

// constants
export default class WPE {
    args = process.argv;

    fetchUsers = async (sites, emailIndex, file) => {
        try {
            await LegacyAdminEmailUpdate(sites, emailIndex, file)
        }
        catch (err) {
            console.log(err)
        }
    }
}
