#! /usr/bin/env node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
import Auth from '../auth/auth.js';

export default class SSH {
    auth = new Auth()
    constructor() {}
    
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
