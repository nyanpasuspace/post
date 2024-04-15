const { createRestAPIClient } =  require('masto');

async function toot(instance, token) {
    const masto = createRestAPIClient({
        url: instance,
        accessToken: token
    })
    const status = await masto.v1.statuses.create({
        status: "Hello from #mastojs!",
        visibility: "public",
    });
}

// TODO 本地环境网络问题，无法成功发送
module.exports = async function mastodonTest(instance, token) {
    try {
        toot(instance, token);
    }
    catch(error) {
        console.log(error);
    }
}