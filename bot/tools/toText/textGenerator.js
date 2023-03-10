

const employerText = (employer) => {
    return`
#employer #ish_kerak

<b>๐ค Ism: </b> ${employer.first_name} ${employer.last_name}
<b>๐ Telefon: </b> ${employer.phone}
<b>๐  Joylashuv: </b> ${employer.city}
<b>๐ง Email: </b> ${employer.email}
<b>๐ Yoshi: </b> ${employer.age}
<b>๐จโ๐ฉโ๐งโ๐ฆ Jinsi: </b> ${employer.sex == 'm' ? 'Erkak' : 'Ayol'}
<b>๐ฑ Telegram: </b> ${employer.telegram}
<b>๐ฐ Narxi: </b> ${employer.price} so'm
<b>๐ Mutaxassisligi: </b> ${employer.speciality}
<b>๐ Ish tajribasi: </b> ${employer.experience}
<b>๐ Murojaat vaqti: </b> ${employer.time1} - ${employer.time2}
<b>โ๏ธ Ma'lumot: </b> <i>${employer.info}</i>

<b>๐๐ป <a href="https://t.me/vacansy_uz">Vacansy Uz</a></b>
    `
}

const companyText = (company) => {
    return`
#company #xodim #ish
    
<b>๐ข Kompaniya nomi: </b> ${company.company_name}
<b>๐ Telefon: </b> +${company.phone}
<b>๐  Joylashuv: </b> ${company.city}
<b>๐ง Email: </b> ${company.email}
<b>๐ฑ Telegram: </b> ${company.telegram}
<b>๐ฐ Narxi: </b> ${company.price} so'm
<b>๐ Mutaxassisligi: </b> ${company.speciality}
<b>๐ Ish tajribasi: </b> ${company.experience}
<b>๐ Murojaat vaqti: </b> ${company.time1} - ${company.time2}
<b>๐ Ish vaqti: </b> ${company.time3} - ${company.time4}
<b>โ๏ธ Ma'lumot: </b> <i>${company.info}</i>

<b>๐๐ป <a href="https://t.me/vacansy_uz">Vacansy Uz</a></b>
`
}

module.exports = {employerText, companyText};