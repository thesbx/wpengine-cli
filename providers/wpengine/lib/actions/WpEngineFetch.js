import { WpEngineClient } from '../WpEngineClient.js'

export default async function WpEngineFetch() {
    const client = WpEngineClient({
        BASE_URL: 'https://api.wpengineapi.com/v1/',
        WPE_USERNAME: process.env.WPENGINE_USER_ID,
        WPE_PASSWORD: process.env.WPENGINE_PASSWORD
    })
}