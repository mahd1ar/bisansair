import { VercelRequest, VercelResponse } from '@vercel/node'
import axios, { AxiosInstance, AxiosResponse, AxiosError, Axios , AxiosRequestConfig } from "axios";

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
    const query = request.query
const headers = request.headers
const body = request.body

        try {
          
            const date = new Date();
            const YYYY = date.getFullYear();
            const D = date.getDate();
            const M = date.getMonth()+1;

            const toggleUrl = `https://api.track.toggl.com/reports/api/v2/weekly?user_agent=${process.env.EMAIL}&workspace_id=${process.env.WORKSPACEID}&since=${YYYY}-${M}-${D}`
            
            const config : AxiosRequestConfig = {
                headers : {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + process.env.BASIC_TOGGL_TOKEN
                }
            } 

            const { data }: AxiosResponse<TogglResponse.RootObject> = await axios.get(toggleUrl,config);

            const todayReport =  Number((data.total_grand / 3600000 ).toFixed(2));
            const Ho = ~~todayReport;
            const Mi = todayReport - Ho;
            const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAMTOKEN}/sendMessage`
            const telegramResponse = await axios.post(
                telegramUrl,
                {
                    "chat_id" : "@seniorsysadm1n",
                    text : JSON.stringify( {Mi,Ho,query,headers,body})
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