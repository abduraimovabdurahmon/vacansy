
const path = require('path');
const fs = require('fs');


const channelPost = async (data) => {
    
     try {

        const {deleteFirstElement} = require('./firstElement');
        await deleteFirstElement(data)
        const {employer, company} = require('./../../image/generator');

        if(data.info.type == 'e'){
            const bot = require('./../../index');
            await employer(data.data);
            const image = await fs.readFileSync(path.join(__dirname, './../../', 'image/output/employer.png'));
            await bot.telegram.sendPhoto(process.env.CHANNEL_ID, {source: image}, {
                caption: data.text,
                parse_mode: 'HTML'
            })
        }
        else if(data.info.type == 'c'){
            const bot = require('./../../index');
            await company(data.data);
            const image = await fs.readFileSync(path.join(__dirname, './../../', 'image/output/company.png'));
            await bot.telegram.sendPhoto(process.env.CHANNEL_ID, {source: image}, {
                caption: data.text,
                parse_mode: 'HTML'
            })
        }

        
     } catch (error) {
        console.log(error)
     }
}

module.exports = channelPost;