const identicon = require('identicon');

function iconGenerater(username) {
    const buffer = identicon.generateSync({ id: username, size: 200 });
    return buffer.toString('base64');
}

module.exports = iconGenerater;
