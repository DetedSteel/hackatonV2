const axios = require('axios')

async function start(){
    const data = await axios('https://geocode.search.hereapi.com/v1/geocode?q=Москва%2C+Russia&apiKey=vPwav-c_5m8X9u-6m_aVOhiRdSA6629ZFKVhjE7sh0o')
    console.log(data.data.items[0].position)
}

start()