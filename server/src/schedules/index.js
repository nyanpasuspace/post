const mastodonPing = require('./mastodonPing');

module.exports = async function initSchedules() {
  await mastodonPing();
};