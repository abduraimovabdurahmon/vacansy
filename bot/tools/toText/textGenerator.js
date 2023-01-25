

const employerText = (employer) => {
    return`
#employer #ish_kerak

<b>👤 Ism: </b> ${employer.first_name} ${employer.last_name}
<b>📞 Telefon: </b> ${employer.phone}
<b>🏠 Joylashuv: </b> ${employer.city}
<b>📧 Email: </b> ${employer.email}
<b>📅 Yoshi: </b> ${employer.age}
<b>👨‍👩‍👧‍👦 Jinsi: </b> ${employer.sex == 'm' ? 'Erkak' : 'Ayol'}
<b>📱 Telegram: </b> ${employer.telegram}
<b>💰 Narxi: </b> ${employer.price} so'm
<b>📚 Mutaxassisligi: </b> ${employer.speciality}
<b>📝 Ish tajribasi: </b> ${employer.experience}
<b>🕒 Murojaat vaqti: </b> ${employer.time1} - ${employer.time2}
<b>✏️ Ma'lumot: </b> <i>${employer.info}</i>

<b>👉🏻 <a href="https://t.me/vacansy_uz">Vacansy Uz</a></b>
    `
}

const companyText = (company) => {
    return`
#company #xodim #ish
    
<b>🏢 Kompaniya nomi: </b> ${company.company_name}
<b>📞 Telefon: </b> +${company.phone}
<b>🏠 Joylashuv: </b> ${company.city}
<b>📧 Email: </b> ${company.email}
<b>📱 Telegram: </b> ${company.telegram}
<b>💰 Narxi: </b> ${company.price} so'm
<b>📚 Mutaxassisligi: </b> ${company.speciality}
<b>📝 Ish tajribasi: </b> ${company.experience}
<b>🕒 Murojaat vaqti: </b> ${company.time1} - ${company.time2}
<b>📅 Ish vaqti: </b> ${company.time3} - ${company.time4}
<b>✏️ Ma'lumot: </b> <i>${company.info}</i>

<b>👉🏻 <a href="https://t.me/vacansy_uz">Vacansy Uz</a></b>
`
}

module.exports = {employerText, companyText};