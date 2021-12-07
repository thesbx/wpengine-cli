import dotenv from 'dotenv'
import LegacyAdminEmailUpdate from './lib/actions/LegacyAdminEmailUpdate.js'
dotenv.config()

/**
 * Handles wpengine logic
 * @class WPE
 */
export default class WPE {

    fetchUsers = async (sites, emailIndex, file) => {
        try {
            await LegacyAdminEmailUpdate(sites, emailIndex, file)
        }
        catch (err) {
            console.log(err)
        }
    }
}
