import { VercelRequest, VercelResponse } from '@vercel/node'
import fs from "fs";
import { join } from 'path'



export default async (request: VercelRequest, response: VercelResponse) => {
    const head = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HELP</title>
        <!-- Compiled and minified CSS -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    </head>
    
    <body>
        <div class="container">
            <div class="row">
    `

    const tail = `</div></div></body></html>`

    try {


        const list = fs.readdirSync(join(__dirname, '..'));


        const cards = list.filter(i => i.split(".")[0] === "html").map(i => {

            return `<div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">Card Title</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                            <a href="#">${i}</a>
                            <a href="#">This is a link</a>
                        </div>
                    </div>
                </div>`

        })

        const template = head + cards + tail;

        response.status(200).send(template)

    } catch (error) {

        response.status(200).send(JSON.stringify(error))
    }
}
