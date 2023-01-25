const {Scenes: {BaseScene}} = require('telegraf');

const pool = require('./../../database/pool');

const getData = new BaseScene('getData');

getData.enter(async (ctx) => {
    try {
        await ctx.reply("Pastdagi tugmalarni bosish orqali WebAppga o'tib formani to'ldirib 'yuborish' tugmasini bosing!", {
            reply_markup: {
                keyboard: [
                    [
                        {
                            text: 'Xodim',
                            web_app: {
                                url: 'https://sparkling-kataifi-789d99.netlify.app/'
                            }
                        },
                        {
                            text: 'Kompaniya',
                            web_app: {
                                url: 'https://sparkling-kataifi-789d99.netlify.app/'
                            }
                        }
                    ]
                ],
                resize_keyboard: true
            }
        })
    } catch (error) {
        console.log(error)
    }
});



module.exports = getData;