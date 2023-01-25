
const getMyChatMember = async (ctx) => {
    try {
        const bot = require('./../../index');
        const res = await bot.telegram.getChatMember(-1001565597122, ctx.from.id);
        if(res.status === 'member' || res.status === 'administrator' || res.status === 'creator'){
            return true;
        }
        else{
            return false;
        }
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = getMyChatMember;