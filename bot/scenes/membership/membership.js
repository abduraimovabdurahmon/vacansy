const {Scenes: {BaseScene}} = require('telegraf');

const getMyChatMember = require('./../../tools/getMyChatMember');

const membership = new BaseScene('membership');

membership.enter(async (ctx) => {
    try {
        if(await getMyChatMember(ctx)){
            return ctx.scene.enter('mainScene');
        }
        else{
            await ctx.reply('Botdan foydalanish uchun ushbu kanalga a\'zo bo\'ling', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'A\'zo bo\'lish',
                                url: 'https://t.me/vacansy_uz'
                            }
                        ],
                        [
                            {
                                text: 'Tekshirish',
                                callback_data: 'check'
                            }
                        ]
                    ]
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
});

membership.on('callback_query', async (ctx) => {
    try {
        
        if(ctx.callbackQuery.data == 'check'){
            if(await getMyChatMember(ctx)){
                await ctx.deleteMessage();
                return ctx.scene.enter('mainScene');
            }
            else{
                await ctx.answerCbQuery('Siz obuna bo\'lmadingiz!');
            }
        }

    } catch (error) {
        console.log(error)
    }
})




module.exports = membership;