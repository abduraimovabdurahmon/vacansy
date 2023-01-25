

const referal = async (bot, ctx, pool, sceneName) => {

    try {
        
        const refId = await ctx.startPayload?ctx.startPayload:undefined;
        const user = await pool.query(`SELECT * FROM referal WHERE user_id = $1`, [ctx.from.id]) || undefined;

        if(user.rows.length === 0){
            await pool.query(`INSERT INTO referal (user_id) VALUES ($1)`, [ctx.from.id]);
        }
        else{
            if(user.rows[0].suggested == true){
                return ctx.scene.enter(sceneName)
            }
        }

        if(refId == ctx.from.id || !user){
            return ctx.reply("O'zingizni taklif qilolmaysiz!");
        }

        return ctx.scene.enter(sceneName) // keyinchalik o'chirib tashlanadi

        if(refId){
            const refUser = await pool.query(`SELECT * FROM referal WHERE user_id = $1`, [refId]);
            if(refUser.rows[0].suggested == false){
                const me = await pool.query(`SELECT * FROM referal WHERE user_id = $1`, [ctx.from.id]);

                if(me.rows[0].used == false){
                    await pool.query(`UPDATE referal SET suggested = TRUE WHERE user_id = '${refId}';`);
                    await bot.telegram.sendMessage(refId, `Tabriklaymiz! Siz taklif qilgan do'stingiz botga qo'shildi✅ /start tugmasini bosing.`);
                    return ctx.reply("Assalomu alaykum! Botga xush kelibsiz, botdan foydalanish uchun bitta do'stingizni taklif qilishingiz kerak. Siz uchun referral ssilka:"+`https://t.me/${bot.botInfo.username}?start=${ctx.from.id}`);
                }
                else{
                    return ctx.reply("Siz do'stingiz uchun referal bo'lolmadingiz, chunki siz botdan avval ro'yxatdan o'tgansiz. Siz shunchaki /start tugmasini bosing!")
                }
            }
            else{
                return ctx.reply(`Assalomu alaykum, Botga xush kelibsiz! Botdan foydalanishingiz uchun bitta do'stingizni taklif qilishingiz kerak. Siz uchun referral link: https://t.me/${bot.botInfo.username}?start=${ctx.from.id}`);
            }
        }
        else{
            await pool.query(`UPDATE referal SET used = TRUE WHERE user_id ='${ctx.from.id}';`);
            return ctx.reply(`Assalomu alaykum, Botga xush kelibsiz! Botdan foydalanishingiz uchun bitta do'stingizni taklif qilishingiz kerak. Siz uchun referral link: https://t.me/${bot.botInfo.username}?start=${ctx.from.id}`);
        }

    } catch (error) {
        console.log(error)
    }

}

module.exports = referal;