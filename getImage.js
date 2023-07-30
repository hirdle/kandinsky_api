const fetch = require('node-fetch');

async function createImage (query, width=1024, height=1024) {

    const response = await fetch("https://api.fusionbrain.ai/web/api/v1/text2image/run?model_id=1", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru,en;q=0.9",
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundary3BRcDBv2PfTtIoxq",
            "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Yandex\";v=\"23\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://editor.fusionbrain.ai/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": `------WebKitFormBoundary3BRcDBv2PfTtIoxq\r\nContent-Disposition: form-data; name=\"params\"; filename=\"blob\"\r\nContent-Type: application/json\r\n\r\n{\"type\":\"GENERATE\",\"style\":\"DEFAULT\",\"width\":${width},\"height\":${height},\"generateParams\":{\"query\":\"${query}\"}}\r\n------WebKitFormBoundary3BRcDBv2PfTtIoxq--\r\n`,
        "method": "POST"
    })

    const result = await response.json();
    return result.uuid; 
}



async function readImage (uuid) {

    const response = await fetch(`https://api.fusionbrain.ai/web/api/v1/text2image/status/${uuid}`, {
        "method": "GET"
    });

    const result = await response.json();
    return result.images[0];

}


function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getImage (q) {
    const uuid = await createImage(q);
    await delay(8000);
    return await readImage(uuid)
}

module.exports = { getImage };