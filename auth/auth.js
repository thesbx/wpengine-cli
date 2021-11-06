const fs = require('fs')
require('dotenv').config()
const {
    parse,
    stringify
} = require('envfile');
const envPath = '.env';
// const { exec } = require('child_process');
const fetch = import('node-fetch');
const WPENGINE_PASSWORD = process.env.WPENGINE_PASSWORD;
const WPENGINE_USER_ID = process.env.WPENGINE_USER_ID;

const authorization = "Basic " + Buffer.from(WPENGINE_USER_ID + ":" + WPENGINE_PASSWORD).toString('base64')
/**
 * 
 * @param {string} key 
 * //Function to get value from env
 */
 function getEnv(key) {
    return process.env[key];
}

/**
 * 
 * @param {string} key 
 * @param {string} value 
 * //Function to set environment variables.
 */

 async function setEnv(key, value) {
    fs.readFile(envPath, 'utf8', function (err, data) {
        if (err) {
            return console.warn(err);
        }
        const result = parse(data);
        result[key] = value;
        fs.writeFile(envPath, stringify(result), function (err) {
            if (err) {
                return console.log(err);
            }
        })

    });
}

function fetchInstalls() {
    fetch('https://api.wpengineapi.com/v1/installs?limit=10', {
        method: 'GET',
        headers: { 'Authorization': authorization },
    })
      .then(res => res.json())
      .then(json => console.log(json));
    
    console.log("test");
}

module.exports = {setEnv, getEnv, fetchInstalls};