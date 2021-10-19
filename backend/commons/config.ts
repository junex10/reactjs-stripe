import { Utility } from "../utilitys/Utility";

export let enviroment: string = Utility.Enviroment.actualEnviroment;

/* 

*/

export const currentUserCreated = [
    {
        view: "all"
    },
    {
        view: "userProfile"
    },
    {
        view: "userLogs"
    },
    {
        view: "userAccount"
    }
];