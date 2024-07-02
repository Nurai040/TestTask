import axios from 'axios';
import {HttpsProxyAgent} from 'https-proxy-agent';

async function reqToProxy(userId: number): Promise<void>{
    const proxy = {
        host: '45.196.48.9',
        port: 5435,
        auth: {
            username: 'jtzhwqur',
            password: 'jnf0t0n2tecg',
        },
    };

    const proxyUrl = `http://${proxy.auth.username}:${proxy.auth.password}@${proxy.host}:${proxy.port}`;
    const httpsAgent = new HttpsProxyAgent(proxyUrl);

    const url = `http://localhost:3000/users/${userId}`;

    try {
        const response = await axios.get(url, {
            httpsAgent,
          });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

reqToProxy(1);