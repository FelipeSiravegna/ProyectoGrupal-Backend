const axios = require("axios");

const PaymentService = async (email) => {
    const body = {
        reason: "Suscripción de ejemplo",
        auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 499,
        currency_id: "ARS"
        },
        back_url: "https://google.com.ar",
        payer_email: `${email}`,
        notification_url:`https://eo13gy27jxjgq8p.m.pipedream.net`
        //"status": "authorized"
        };
    console.log(process.env.ACESS_TOKEN_MP_S)
    const url = "https://api.mercadopago.com/preapproval";
    const subscription = await axios.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.ACESS_TOKEN_MP_S}`
        }
        })
    return subscription.data;
}


module.exports = PaymentService;