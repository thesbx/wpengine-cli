/**
 * @package WPE CLI
 * @author thesbx
 * @license MIT
 *
 */

import Auth from '../auth/auth.js';
import WPE from '../providers/wpengine/wpe.js';

/**
 * Base class
 * @class Commands
 * @since 1.0.7
 */
export class Commands {

    auth;
    wpe;

    constructor() {
        this.auth = new Auth()
        this.wpe = new WPE()
    }

    
}
