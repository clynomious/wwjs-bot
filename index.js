const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const clt = require('./lib/Collection')
const messageCreate = require('./Events/messageCreate')

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './auth',
        userDataDir: './auth/session'
    }),
    puppeteer: {
        headless: true
    }
})

client.commands = new clt.Collection()
client.config = require('./config.json')

// read commands
require('./Handlers/Commands')(client)

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log('QR RECEIVED', qr);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

client.on('message_create', async (msg) => {
    messageCreate(msg, client)
});

client.initialize()