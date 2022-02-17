import { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosInstance, AxiosResponse, AxiosError, Axios, AxiosRequestConfig } from "axios";
import { GithubPayload } from './_types';

namespace TogglResponse {

    export interface TotalCurrency {
        currency?: any;
        amount?: any;
    }

    export interface Title {
        client?: any;
        project: string;
        color: string;
        hex_color: string;
    }

    export interface Title2 {
        user: string;
    }

    export interface Detail {
        uid: number;
        title: Title2;
        totals: number[];
    }

    export interface Datum {
        title: Title;
        pid: number;
        totals: number[];
        details: Detail[];
    }

    export interface RootObject {
        total_grand: number;
        total_billable?: any;
        total_currencies: TotalCurrency[];
        data: Datum[];
        week_totals: number[];
    }

}


export default async (request: VercelRequest, response: VercelResponse) => {


    const lastCommit = {
        url: (<GithubPayload.RootObject>request.body).commits[0].url,
        id: (<GithubPayload.RootObject>request.body).commits[0].id,
        message: (<GithubPayload.RootObject>request.body).commits[0].message,
        modifiedFiles: (<GithubPayload.RootObject>request.body).commits[0].modified,
        modifiedPages: (<GithubPayload.RootObject>request.body).commits[0].modified.filter(i => i.split("/").reverse()[0].split(".").reverse()[0] === "html").map(i => i.split("/").reverse()[0])
    };

    if (lastCommit.message.slice(0, 5) !== "[log]") {
        response.send("abort").status(200)
        return
    }



    try {

        // toggl
        const date = new Date();
        const YYYY = date.getFullYear();
        const D = date.getDate();
        const M = date.getMonth() + 1;

        const toggleUrl = `https://api.track.toggl.com/reports/api/v2/weekly?user_agent=${process.env.EMAIL}&workspace_id=${process.env.WORKSPACEID}&since=${YYYY}-${M}-${D}`

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + process.env.BASIC_TOGGL_TOKEN
            }
        }

        const { data }: AxiosResponse<TogglResponse.RootObject> = await axios.get(toggleUrl, config);

        const todayReport = Number((data.total_grand / 3600000).toFixed(2));


        const toggleReport = {
            h: ~~todayReport,
            m: Math.ceil((todayReport - (~~todayReport)) * 60)
        }



        // wrap up

        let templateHtml = "[ Daily Report Bot ]\n\n" +
            "🖥 Project name : <b>Bisansir</b>\n\n" +
            "⏰ <i>report time from toggl:</i>\n" +
            `<b> ${toggleReport.h} hours - ${toggleReport.m} minutes </b>\n\n` +
            "🚩 <i>last commit:</i>\n" +
            `<a href="${lastCommit.url}" > ${lastCommit.id} </a>\n\n` +
            "✉️ <i>commit message:</i>\n" +
            `${lastCommit.message.replace("[log]", "")}\n\n` +
            "🎖 <i>modified pages : </i>\n" +
            lastCommit.modifiedPages.map(i => `<a href="https://bisanseir.vercel.app/${i}"> ${i} </a>`).join("\n") + "\n\n" +
            "💥 <i>modified files : </i>\n" +
            lastCommit.modifiedFiles.join("\n") + "\n\n" +
            "🔍 <i>preview all:</i>\n" +
            `<a href="https://bisanseir.vercel.app/api/help"> https://bisanseir.vercel.app/api/help </a>\n\n`;


        const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAMTOKEN}/sendMessage`
        const telegramResponse = await axios.post(
            telegramUrl,
            {
                "chat_id": "@seniorsysadm1n",
                text: templateHtml,
                "parse_mode": "html"
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
        response.status(telegramResponse.status).send("DONE-")

    } catch (error) {
        response.status(500).send(error)
    }


}
