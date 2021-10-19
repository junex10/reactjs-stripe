import { Utility } from "../utilitys/Utility";

export let enviroment: string = Utility.Enviroment.actualEnviroment;
export const ACCESS = [
    {
        name: 'Administrador',
        views: [
            {
                view: 'all'
            }
        ]
    },
    {
        name: 'Usuario',
        views: [
            {
                view: 'profile'
            },
            {
                view: 'logs'
            },
            {
                view: 'account'
            },
        ]
    }
];