import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios';
import { GithubCommit, GtihubTree } from './_types';



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


        const commits = await axios.get<GithubCommit.RootObject[]>("https://api.github.com/repos/mahd1ar/bisanseir/commits")


        const rootTree = await axios.get<GtihubTree.RootObject>(commits.data[0].commit.tree.url)

        const srcTree = await axios.get<GtihubTree.RootObject>(rootTree.data.tree.find(i => i.path === 'src')!.url)


        const cards = srcTree.data.tree.filter(i => i.path.split(".")[0] === "html").map(i => {

            return `<div class="col s12 m6">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">Card Title</span>
                            <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                        </div>
                        <div class="card-action">
                            <a href="#">${i.path}</a>
                            <a href="#">${i.url}</a>
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