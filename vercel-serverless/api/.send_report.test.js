const axios = require('axios');

const main = async () => {
    const EMAIL = "mahdiyaranari@gmail.com"
    const WORKSPACEID = "5623714"

    // "telegram_token"
    const date = new Date();
    const YYYY = date.getFullYear();
    const D = date.getDate();
    const M = date.getMonth() + 1;

    const toggleUrl = `https://api.track.toggl.com/reports/api/v2/weekly?user_agent=${EMAIL}&workspace_id=${WORKSPACEID}&since=${YYYY}-${M}-${D}`

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic OTMzNmJmMzY3ODFmOWQ4YjAxYTQ4NzA4MzgwYWZlNjc6YXBpX3Rva2Vu'
        }
    }

    const { data } = await axios.get(toggleUrl, config);

    const todayReport = Number((data.total_grand / 3600000).toFixed(2));
    const Ho = ~~todayReport;
    const Mi = todayReport - Ho;

    const telegramUrl = `https://api.telegram.org/bot2036153001:AAHM2fgxCg2zT8728-YCE2I4r-ij8J8bobY/sendMessage`
    await axios.post(
        telegramUrl,
        {
            "chat_id": "@seniorsysadm1n",
            text: JSON.stringify({ Mi, Ho })
        },
        {
            headers: {
                'Content-Type': 'application/json'
            },
        })



}

main()