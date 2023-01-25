const {Scenes: {BaseScene}} = require('telegraf');

const {getFirstElement, deleteFirstElement} = require('./../../tools/firstElement');

const channelPost = require('./../../tools/channelPost');

const sendUser = new BaseScene('sendUser');

sendUser.enter(async (ctx) => {
    try {
        
        const data = await getFirstElement();
        ctx.session.user = await data;

        if(data){
            await ctx.replyWithHTML(`
#employer #ish_kerak

<b>👤 Ism: </b> ${data.first_name} ${data.last_name}
<b>📞 Telefon: </b> +${data.phone}
<b>🏠 Joylashuv: </b> ${data.city[0].toUpperCase()+data.city.slice(1)}
<b>📧 Email: </b> ${data.email}
<b>📅 Yoshi: </b> ${data.age}
<b>👨‍👩‍👧‍👦 Jinsi: </b> ${data.sex == 'm' ? 'Ayol' : 'Erkak'}
<b>📱 Telegram: </b> ${data.telegram}
<b>💰 Narxi: </b> ${data.price} so'm
<b>📚 Mutaxassisligi: </b> ${data.speciality}
<b>📝 Ish tajribasi: </b> ${data.experience[0].toUpperCase()+data.experience.slice(1)}
<b>🕒 Murojaat vaqti: </b> ${data.time1} - ${data.time2}
<b>✏️ Ma'lumot: </b> <i>${data.info}</i>

<b>👉🏻 <a href="https://t.me/vacansy_uz">Vacansy Uz</a></b>

<b> UserId: </b> ${data.user_id}

            `, {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Tasdiqlash✅",
                                callback_data: 'confirm'
                            },
                        ],
                        [
                            {
                                text: "Rad etish🚮",
                                callback_data: 'cancel'
                            },
                        ],
                        [
                            {
                                text: "Orqaga↩️",
                                callback_data: 'back'
                            }
                        ]
                    ]
                }
            })
        }
        else{
            await ctx.reply("E'lon tugadi!", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: "Orqaga",
                                callback_data: 'back'
                            }
                        ]
                    ]
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
});

sendUser.on('callback_query', async (ctx) => {
    try {
        if(ctx.update.callback_query.data == 'back'){
            await ctx.deleteMessage();
            return ctx.scene.enter('adminMenu');
        }
        else if(ctx.update.callback_query.data == 'confirm'){
            await channelPost(ctx);
            await ctx.answerCbQuery('E\'lon yuborildi!');
            await ctx.deleteMessage();  
            return ctx.scene.reenter();
        }
        else if(ctx.update.callback_query.data == 'cancel'){
            await deleteFirstElement(ctx.session.user.user_id);
            await ctx.deleteMessage();
            return ctx.scene.reenter();
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = sendUser;