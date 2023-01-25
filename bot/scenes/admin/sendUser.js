const {Scenes: {BaseScene}} = require('telegraf');

const {getFirstElement, deleteFirstElement} = require('./../../tools/firstElement');
const channelPost = require('./../../tools/channelPost');


const sendUser = new BaseScene('sendUser');

sendUser.enter(async (ctx) => {
    try {
        const data = await getFirstElement();
        if(!data){
            ctx.session.data = await [];
            return ctx.reply('E\'lonlar tugadi!',{
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: 'Orqaga',
                                callback_data: 'back'
                            }
                        ]
                    ]
                }
            })
        }
        ctx.session.data = await data;


        await ctx.replyWithHTML(data.text,{
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
        });
      

    }
    catch (err) {
        console.log(err)
    }
});

sendUser.on('callback_query', async (ctx) => {
    try {
        if(ctx.update.callback_query.data == 'back'){
            await ctx.deleteMessage();
            return ctx.scene.enter('adminMenu');
        }
        else if(ctx.update.callback_query.data == 'confirm'){
            await channelPost(ctx.session.data);
            await ctx.answerCbQuery('E\'lon yuborildi!');
            await ctx.deleteMessage();  
            return ctx.scene.reenter();
        }
        else if(ctx.update.callback_query.data == 'cancel'){
            await deleteFirstElement(ctx.session.data);
            await ctx.deleteMessage();
            return ctx.scene.reenter();
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = sendUser;