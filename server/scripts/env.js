const fs = require('fs');
const { resolve } = require('path');
const dotenv = require('dotenv');

const dotenvTags = [
    'development',
    'test',
    'production'
];

if(!dotenvTags.includes(process.env.NODE_ENV)) {
    process.env.NODE_ENV = dotenvTags[0];
}

const dotenvPath = resolve('.env');
const dotenvFiles = [
    dotenvPath,
    `${dotenvPath}.local`,
    `${dotenvPath}.${process.env.NODE_ENV}`,
    `${dotenvPath}.${process.env.NODE_ENV}.local`,
].filter(fs.existsSync);

dotenvFiles.reverse().forEach((dotenvFile) => {
    dotenv.config({
        path: dotenvFile
    })
});