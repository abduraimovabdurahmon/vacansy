const {Scenes: {BaseScene}} = require('telegraf');

const checkAccess = require('./../../tools/checkAccess');

const pool = require('./../../database/pool');

const mainScene = new BaseScene('mainScene');

mainScene.enter(async (ctx) => {
    try {
        ctx.reply("E'lon berish uchun e'lon berish tugmasini bosing!", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'E\'lon berish',
                            callback_data: 'create'
                        }
                    ]
                ],
                remove_keyboard: true
            }
        })
    } catch (error) {
        console.log(error)
    }
});


mainScene.on('callback_query', async (ctx) => {
    try {
        await ctx.replyWithChatAction('typing');
        if(ctx.callbackQuery.data == 'create'){
            if(await checkAccess(ctx)){
                const check = await pool.query('SELECT * FROM employers WHERE user_id = $1', [ctx.from.id]);
                if(check.rowCount == 0){
                    await ctx.deleteMessage();
                    return ctx.scene.enter('getData');
                }
                else{
                    return ctx.answerCbQuery("Sizni avvalgi bergan e'loningiz hali ko'rib chiqilmagan.", {show_alert: true})
                }
            }
            else{
                await ctx.answerCbQuery('Bir kunda bir marta e\'lon berish mumkin!', {show_alert: true});
            }
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = mainScene;