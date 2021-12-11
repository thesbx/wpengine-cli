#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author thesbx
 * @license MIT
 *
 */

import fetch from 'node-fetch';
import {Commands} from '../commands/commands.js';

/**
 * Handles the logic for the ssh CLI
 * @class SSH
 * @since 1.0.0
 */
export class SSH extends Commands {
    
    /**
     * fetches a list of SSH keys from users wpengine account
     * @param {*} limit 
     * @returns
     * @since 1.0.0
     */
    showKeys = async (limit) => {
        if (limit > 0) {
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
    
    /**
     * Add a public key to your wpengine.com account
     * @param {*} key 
     */
    addKey = async (key) => {
        const data = await fetch(`https://api.wpengineapi.com/v1/ssh_keys`, {
            method: 'POST',
            body: {
                'public_key': key
            },
            headers: { 
                'Authorization': this.auth.authorization,
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        })
        const response = await data.json();
        console.log("Site successfully created!", response);
    }

    deleteKey = async () => {

    }
    
    ssh = () => {
            
    }
}
