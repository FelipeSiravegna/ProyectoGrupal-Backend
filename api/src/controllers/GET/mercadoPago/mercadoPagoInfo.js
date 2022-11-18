const axios = require('axios')

const getMercadoPagoInfo = async (id, topic) => {
    const responseMP = await axios.get(`https://api.mercadopago.com/v1/payments/${id}?access_token=${process.env.ACESS_TOKEN_MP_S}`)
    //console.log(responseMP.data)
    if (responseMP.data.status === 'approved') {
        return responseMP.data
    }
}

module.exports = getMercadoPagoInfo