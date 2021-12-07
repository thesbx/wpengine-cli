#! /usr/bin/env node
/**
 * @package WPE CLI
 * @author Matt Miller
 * @license MIT
 *
 */

import fetch from 'node-fetch';
import Auth from '../auth/auth.js';

export default class Installs {
    auth = new Auth()
    constructor() {}
    
    listInstalls = async () => {
        const data = await fetch(`https://api.wpengineapi.com/v1/installs`, {
            method: 'GET',
            headers: { 'Authorization': this.auth.authorization },
        })
        const json = await data.json();
    
        const accounts = json.results.map(data => {
            return {
                name: data.name,
                value: data.id
            };
        })
        return accounts;
    }
    
    newInstall = async () => {
    
    }
    
    installs = () => {
        // Add prompts here
    }
}
