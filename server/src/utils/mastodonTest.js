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

// 本地环境测试中，clash 使用 TUN 模式添加白名单
module.exports = async function mastodonTest(instance, token) {
    try {
        toot(this.instance, this.token);
        return true;
    }
    catch(error) {
        console.log(error);
        return false;
    }
}