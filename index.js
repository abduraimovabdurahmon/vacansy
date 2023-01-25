require('dotenv').config()
const path = require('path');
const fs = require('fs'); 
const {Telegraf, Scenes: {Stage}} = require('telegraf')
const Localsession = require("telegraf-session-local");

// import image generator functions
// const {employer} = require('./')

// import database
const pool = require('./bot/database/pool');
// import tools
const referal = require('./bot/tools/referal');

// create bot
const bot = new Telegraf(process.env.BOT_TOKEN)

// middlewares
bot.use(new Localsession({ database: "./bot/session/session.json" }).middleware());

// use stages
bot.use(new Stage(require('./bot/scenes/stage/stage')).middleware())


// start command

bot.start(async (ctx) => {
    try {
        
        referal(bot, ctx, pool, 'membership');
        require('./bot/tools/insertData')(ctx);
        
    }
    catch (err) {
        console.log(err)
    }
})

// bot command admin


bot.command('admin', async (ctx) => {
    try {
        if(ctx.from.id == 1242543801 || ctx.from.id == 456381630){
            ctx.scene.enter('adminMenu');
        }
        else{
            ctx.reply('Admin: @abdurakhmon_04')
        }
    } catch (error) {
        console.log(error)
    }
})

// bot on web app data
bot.on('web_app_data', async (ctx) => {
    try {
        const res = await JSON.parse(ctx.update.message.web_app_data.data);
        await ctx.replyWithChatAction('typing');

        await pool.query('UPDATE access SET access = $1 WHERE user_id = $2', [false, ctx.from.id])
        

        if(res.type === 'e'){
            const check = await pool.query('SELECT * FROM employers WHERE user_id = $1', [ctx.from.id]);

            if(check.rowCount > 0){
                await ctx.reply('Avvalgi bergan arizangiz hali ko\'rib chiqilmagan.',{
                    reply_markup: {
                        remove_keyboard: true
                    }
                })
            }
            else{
                await pool.query(`
                    INSERT INTO employers (user_id, first_name, last_name, age, sex, phone, email, city, telegram, price, experience, speciality, time1, time2, info)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
                `,[ctx.from.id, res.firstname, res.lastname, res.age, res.sex, res.phone, res.email, res.address, res.telegram, res.price, res.experience, res.speciality, res.time1, res.time2, res.info])
                .then(async () => {
                ctx.reply('Ma\'lumotlar qabul qilindi✅\nTez orada ma\'lumotlaringiz tekshirilib kanalga joylanadi.', {
                    reply_markup: {
                        remove_keyboard: true
                    }
                })
                })
                .catch(async (err) => {
                    console.log(err)
                    ctx.reply('Ma\'lumotlar qabul qilinmadi❌\nAdmin bilan bog\'laning.', {
                        reply_markup: {
                            remove_keyboard: true
                        }
                    })
                })
            }
            
          
        }

        return ctx.scene.enter('mainScene');

    } catch (error) {
        console.log(error)
    }
})

// crone job
const cron = require('node-cron');
// use cron job

cron.schedule("0 0 * * *", async () => {
    try {
        await pool.query('UPDATE access SET access = true WHERE access = false;');
    } catch (error) {
        console.log(error)
    }
});

// bot launch
bot.launch()

// export bot
module.exports = bot