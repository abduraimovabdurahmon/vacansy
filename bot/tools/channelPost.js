
const channelPost = async (ctx) => {
    try {
        const bot = require('../index');
        const path = require('path');
        const fs = require('fs');
        const {employer} = require('../../image/generator');
        const {deleteFirstElement} = require('./firstElement');

        await employer({
            name: `${ctx.session.user.first_name} ${ctx.session.user.last_name}`,
            speciality: ctx.session.user.speciality,
            location: `${ctx.session.user.city[0].toUpperCase()+ctx.session.user.city.slice(1)}, Uzbekistan`,
            phone: `+${ctx.session.user.phone}`,
            telegram: ctx.session.user.telegram.replace('@', 'https://t.me/'),
        });

        const employerImage = await fs.readFileSync(path.join(__dirname, '..', '..', 'image', 'output', 'employer.png'));


        const text = `
#employer #ish_kerak

<b>👤 Ism: </b> ${ctx.session.user.first_name} ${ctx.session.user.last_name}
<b>📞 Telefon: </b> +${ctx.session.user.phone}
<b>🏠 Joylashuv: </b> ${ctx.session.user.city[0].toUpperCase()+ctx.session.user.city.slice(1)}
<b>📧 Email: </b> ${ctx.session.user.email}
<b>📅 Yoshi: </b> ${ctx.session.user.age}
<b>👨‍👩‍👧‍👦 Jinsi: </b> ${ctx.session.user.sex == 'm' ? 'Erkak' : 'Ayol'}
<b>📱 Telegram: </b> ${ctx.session.user.telegram}
<b>💰 Narxi: </b> ${ctx.session.user.price} so'm
<b>📚 Mutaxassisligi: </b> ${ctx.session.user.speciality}
<b>📝 Ish tajribasi: </b> ${ctx.session.user.experience[0].toUpperCase()+ctx.session.user.experience.slice(1)}
<b>🕒 Murojaat vaqti: </b> ${ctx.session.user.time1} - ${ctx.session.user.time2}
<b>✏️ Ma'lumot: </b> <i>${ctx.session.user.info}</i>

<b>👉🏻 <a href="https://t.me/vacansy_uz">Vacansy Uz</a></b>
        `

        await bot.telegram.sendPhoto(-1001565597122, {source: employerImage}, {
            caption: text,
            parse_mode: 'HTML'
        })

        await deleteFirstElement(ctx.session.user.user_id);
    } catch (error) {
        console.log(error)
    }
};

module.exports = channelPost;