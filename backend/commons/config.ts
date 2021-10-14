import { Utility } from "../utilitys/Utility";

export let enviroment: string = Utility.Enviroment.actualEnviroment;

export const currentUserCreated = [
    {
        view: "userProfile",
        controlName: "all"
    },
    {
        view: "userLogs",
        controlName: "all"
    },
    {
        view: "userAccount",
        controlName: "all"
    }
];