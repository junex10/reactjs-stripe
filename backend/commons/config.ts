import { Utility } from "../utilitys/Utility";

export let enviroment: string = Utility.Enviroment.actualEnviroment;

export const currentUserCreated = [
    {
        view: "all",
        controlName: {
            all: true
        }
    },
    {
        view: "userProfile",
        controlName: {
            all: true
        }
    },
    {
        view: "userLogs",
        controlName: {
            all: true
        }
    },
    {
        view: "userAccount",
        controlName: {
            all: true
        }
    }
];