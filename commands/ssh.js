#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author thesbx
 * @license MIT
 *
 */

import fetch from 'node-fetch';
import Auth from '../auth/auth.js';

/**
 * Handles the logic for the ssh CLI
 * @class SSH
 * @since 1.0.0
 */
export default class SSH {

    auth = new Auth()

    constructor() {}
    
    /**
     * fetches a list of SSH keys from users wpengine account
     * @param {*} limit 
     * @returns
     * @since 1.0.0
     */
    showKeys = async (limit) => {
        if (limit) {
            const data = await fetch(`https://api.wpengineapi.com/v1/ssh_keys?limit=${limit}`, {
                method: 'GET',
                headers: { 'Authorization': this.auth.authorization },
            })
            const json = await data.json();
            const keys = json.results.map(data => {
                return {
                    name: data.comment,
                    value: data.uuid
                };
            })
            console.log(keys);
            return keys;
        } else {
            const data = await fetch(`https://api.wpengineapi.com/v1/ssh_keys`, {
                method: 'GET',
                headers: { 'Authorization': this.auth.authorization },
            })
            const json = await data.json();
            const keys = json.results.map(data => {
                return {
                    name: data.comment,
                    value: data.uuid
                };
            })
            console.log(keys);
            return keys;
        }
    
    }
    
    addKeys = async () => {
    
    }
    
    ssh = () => {
            
    }
}
