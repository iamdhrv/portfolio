const { Server } = require('ssh2');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Generate temporary RSA key for the server in PEM format
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' }
});

let asciiArt = '';
try {
  asciiArt = fs.readFileSync(path.join(__dirname, 'ascii-art7.txt'), 'utf8');
} catch (e) {
  asciiArt = 'ASCII Art not found.';
}

const server = new Server({
  hostKeys: [privateKey]
}, (client) => {
  client.on('authentication', (ctx) => {
    ctx.accept();
  }).on('ready', () => {
    client.on('session', (accept, reject) => {
      const session = accept();
      
      session.on('pty', (accept, reject, info) => {
        accept();
      });

      session.on('shell', (accept, reject) => {
        const stream = accept();
        let themePrompt = '\x1b[1;36mguest\x1b[0m@\x1b[1;32mdhruv-portfolio\x1b[0m:~$ ';
        
        let currentInput = '';

        // Auto-load ASCII and welcome msg
        stream.write('\r\n' + asciiArt + '\r\n\r\n');
        stream.write('Welcome to Dhruv Maniya\'s Interactive CLI Portfolio!\r\n');
        stream.write('Type "help" to see available commands.\r\n\r\n');
        stream.write(themePrompt);

        stream.on('data', (data) => {
          if (!stream.writable) return;
          
          const str = data.toString();
          
          if (str === '\r') {
            const commandArgs = currentInput.trim().split(' ');
            const command = commandArgs[0].toLowerCase();
            currentInput = '';
            
            if (!command) {
              stream.write('\r\n' + themePrompt);
              return;
            }

            stream.write('\r\n');

            switch(command) {
              case 'help':
                stream.write('Available commands:\r\n');
                stream.write('  about     - Learn more about me\r\n');
                stream.write('  projects  - See what I am building\r\n');
                stream.write('  contact   - Get in touch\r\n');
                stream.write('  whoami    - Display my ASCII portrait\r\n');
                stream.write('  music     - Play retro hits (98-2010s)\r\n');
                stream.write('  theme     - Change terminal theme (minimal/matrix|ocean)\r\n');
                stream.write('  clear     - Clear the terminal\r\n');
                stream.write('  exit      - Close connection\r\n');
                break;
              case 'about':
                stream.write('Hi, I am Dhruv Maniya.\r\nI build cool, automated things with code and AI.\r\n');
                break;
              case 'projects':
                stream.write('1. CLI Portfolio (Next.js & SSH)\r\n2. AI Agency Automation\r\n3. And much more...\r\n');
                break;
              case 'contact':
                stream.write('Email: dhruv@example.com\r\nGitHub: github.com/iamdhrv\r\n');
                break;
              case 'whoami':
                stream.write(asciiArt + '\r\n');
                break;
              case 'music':
                stream.write('Now Playing: "Tu Jaane Na" - Atif Aslam (2009)\r\n');
                stream.write('[▶] 01:23 ━━━━●──────────── 05:37\r\n');
                stream.write('\x1b[3mKaise bataye kyu Mujhko chahe...\x1b[0m\r\n');
                break;
              case 'theme':
                const selected = commandArgs[1];
                if (selected === 'matrix') {
                    themePrompt = '\x1b[1;32mguest@matrix:~$ \x1b[0m';
                    stream.write('\x1b[1;32mTheme set to Matrix.\r\n\x1b[0m');
                } else if (selected === 'ocean') {
                    themePrompt = '\x1b[1;36mguest@ocean:~$ \x1b[0m';
                    stream.write('\x1b[1;36mTheme set to Ocean.\r\n\x1b[0m');
                } else if (selected === 'minimal') {
                    themePrompt = '\x1b[1;37mguest@minimal:~$ \x1b[0m';
                    stream.write('Theme set to Minimal.\r\n');
                } else {
                    stream.write('Usage: theme [minimal|matrix|ocean]\r\n');
                }
                break;
              case 'sudo':
                if (commandArgs.join(' ') === 'sudo rm -rf /') {
                    stream.write('\x1b[1;31m[KERNEL PANIC] CRITICAL SYSTEM FAILURE...\x1b[0m\r\n');
                    stream.write('Deleting system files...\r\n');
                    stream.write('Just kidding. Nice try! :)\r\n');
                } else {
                    stream.write('Nice try. You don\'t have sudo privileges.\r\n');
                }
                break;
              case 'clear':
                stream.write('\x1b[2J\x1b[0;0H');
                stream.write(themePrompt);
                return;
              case 'exit':
              case 'quit':
                stream.write('Goodbye!\r\n');
                stream.end();
                return;
              default:
                stream.write(`Command not found: ${command}\r\n`);
            }
            stream.write(themePrompt);
          } else if (str === '\x7f' || str === '\b') {
            if (currentInput.length > 0) {
              currentInput = currentInput.slice(0, -1);
              stream.write('\b \b');
            }
          } else if (str === '\x03') {
            stream.write('^C\r\n');
            currentInput = '';
            stream.write(themePrompt);
          } else {
            currentInput += str;
            stream.write(str);
          }
        });
        
        stream.on('error', (err) => {
          // Ignore stream errors
        });
      });
    });
  }).on('error', (err) => {
    // ignore connection errors
  });
});

server.listen(2222, '0.0.0.0', () => {
  console.log('SSH server listening on port 2222...');
});
