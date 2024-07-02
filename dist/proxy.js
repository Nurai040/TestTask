"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const https_proxy_agent_1 = require("https-proxy-agent");
async function reqToProxy(userId) {
    const proxy = {
        host: '45.196.48.9',
        port: 5435,
        auth: {
            username: 'jtzhwqur',
            password: 'jnf0t0n2tecg',
        },
    };
    const proxyUrl = `http://${proxy.auth.username}:${proxy.auth.password}@${proxy.host}:${proxy.port}`;
    const httpsAgent = new https_proxy_agent_1.HttpsProxyAgent(proxyUrl);
    const url = `http://localhost:3000/users/${userId}`;
    try {
        const response = await axios_1.default.get(url, {
            httpsAgent,
        });
        console.log('Response:', response.data);
    }
    catch (error) {
        console.error('Error fetching data:', error.message);
    }
}
reqToProxy(1);
//# sourceMappingURL=proxy.js.map