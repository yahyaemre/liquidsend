const qrcode = require('qrcode-terminal');
const input = require('input');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const fs = require('fs');

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.clear();
    console.log('LiquidSend is ready, type "liqud --s" to any chat to start sending.');
});


client.on('message_create', async msg => {
    if (msg.body === 'liquid --s') {
        if (msg.fromMe) {
            var numbers = fs.readFileSync('numbers.txt', 'utf8').toString().split("\n");
            var message = fs.readFileSync('message.txt', 'utf8');
            var success = 0;
            var failed  = 0;

            for (var i = 0; i < numbers.length; i++) {

                try {
                    await client.sendMessage(numbers[i] + '@c.us', message);
                    success++;
                } catch (e) {
                    failed++;
                }

                console.log('Sent to ' + numbers[i] + ' | Total success: ' + success + ' | Total failed: ' + failed);
            }
        }
    }
})

client.initialize();