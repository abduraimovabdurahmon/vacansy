const {Scenes: {BaseScene}} = require('telegraf');

const pool = require('./../../database/pool');

const adminMenu = new BaseScene('adminMenu');

adminMenu.enter(async (ctx) => {
    try {
        ctx.reply("Admin paneliga xush kelibsiz!", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "E'lonlar soni📣",
                            callback_data: 'count'
                        }
                    ],
                    [
                        {
                            text: "Boshlash🔴",
                            callback_data: 'start'
                        }
                    ],
                    [
                        {
                            text: "Orqaga↩️",
                            callback_data: 'back'
                        }
                    ]
                ],
                remove_keyboard: true
            }
        });
    } catch (error) {
        console.log(error)
    }
});

adminMenu.on('callback_query', async (ctx) => {

    try {
        if(ctx.callbackQuery.data == 'count'){
            const count = await pool.query('SELECT count(*) as soni FROM employers;');
            const count2 = await pool.query('SELECT count(*) as soni FROM companies;');
            await ctx.answerCbQuery(`E'lonlar soni: ${count.rows[0].soni}\nKompaniyalar soni: ${count2.rows[0].soni}`, {show_alert: true});
        }
        else if(ctx.callbackQuery.data == 'start'){
            await ctx.deleteMessage();
            return ctx.scene.enter('sendUser');
        }
        else if(ctx.callbackQuery.data == 'back'){
            await ctx.deleteMessage();
            return ctx.scene.enter('mainScene');
        }
    } catch (error) {
        console.log(error)
    }

})


module.exports = adminMenu;