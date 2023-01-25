const fs = require('fs')
const path = require('path')
const { createCanvas, loadImage, registerFont } = require('canvas')

const employer = async (data) => {

    try {
        
        registerFont('./fonts/Madina/font.ttf', { family: 'madina' });
        registerFont('./fonts/Arvo/font.ttf', { family: 'arvo' });

        const image = await loadImage(await fs.readFileSync(path.join(__dirname, 'input', 'employer.png')));

        const canvas = createCanvas(image.width, image.height)
        const ctx = canvas.getContext('2d')

        ctx.drawImage(image, 0, 0, image.width, image.height)

        // write name
        ctx.font = '35px arvo';
        ctx.fillStyle = '#000000';
        ctx.fillText( data.name, 70, 135);

        // write speciality
        ctx.font = '20px madina';
        ctx.fillStyle = 'rgb(48,54,66)';
        ctx.fillText( data.speciality, 75, 180);

        // write phone number
        ctx.font = '20px madina';
        ctx.fillStyle = 'rgb(48,54,66)';
        ctx.fillText( data.phone.toString().replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5'), 130, 270);

        // write email
        ctx.font = '18px madina';
        ctx.fillStyle = 'rgb(48,54,66)';
        ctx.fillText( data.email, 130, 330);

        // write telegram username
        ctx.font = '20px madina';
        ctx.fillStyle = 'rgb(48,54,66)';
        ctx.fillText( data.telegram, 130, 395);

        // location
        ctx.font = '20px madina';
        ctx.fillStyle = 'rgb(48,54,66)';
        ctx.fillText( data.location, 130, 460);


        ctx.patternQuality = "best";
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync(path.join(__dirname, 'output', 'employer.png'), buffer);

    } catch (error) {
        console.log(error)
    }

}




// generator function for company

const company = async (data) => {
    
    try {
        
        registerFont('./fonts/Madina/font.ttf', { family: 'madina' });
        registerFont('./fonts/Arvo/font.ttf', { family: 'arvo' });

        const image = await loadImage(await fs.readFileSync(path.join(__dirname, 'input', 'company.png')));

        const canvas = createCanvas(image.width, image.height)
        const ctx = canvas.getContext('2d')

        ctx.drawImage(image, 0, 0, image.width, image.height)


        // write name
        ctx.font = '35px arvo';
        ctx.fillStyle = 'WhiteSmoke';
        ctx.fillText( data.name, 110, 165);

        // phone number
        ctx.font = '20px madina';
        ctx.fillStyle = 'WhiteSmoke';
        ctx.fillText( data.phone, 130, 310);

        // email
        ctx.font = '20px madina';
        ctx.fillStyle = 'WhiteSmoke';
        ctx.fillText( data.email, 130, 370);

        // telegram username
        ctx.font = '20px madina';
        ctx.fillStyle = 'WhiteSmoke';
        ctx.fillText( data.telegram, 130, 435);

        // location
        ctx.font = '20px madina';
        ctx.fillStyle = 'WhiteSmoke';
        ctx.fillText( data.location, 130, 500);

        // save image
        ctx.patternQuality = "best";
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync(path.join(__dirname, 'output', 'company.png'), buffer);



    } catch (error) {
        console.log(error)
    }

}


// const dataEmployer = {
//     name: 'Abdurakhmon Abduraimov',
//     speciality: 'Frontend developer',
//     phone: 998901234567,
//     email: 'abduraimovabdurahmon@gmail.com',
//     telegram: '@abdurakhmon_04',
//     location: 'Tashkent, Uzbekistan'
// }

// const dataCompany = {
//     name: 'Data learning center',
//     phone: '+998 90 123 45 67',
//     email: 'datalearningcenter@gmail.com',
//     telegram: '@datalearningcenter',
//     location: 'Xorazm, Uzbekistan'
// }



module.exports = {employer, company}
