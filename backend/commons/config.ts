import { Utility } from "../utilitys/Utility";
import { JWTAuthManager } from "../auth/JWTAuthManager";

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
export const ACCESS_KEY = [
    {
        name: 'Administrador',
        keys: [
            {
                name: 'all',
                control: ['all']
            }
        ]
    },
    {
        name: 'Usuario',
        keys: [
            {
                name: 'profile',
                control: [
                    'phone',
                    'names'
                ]
            },
            {
                name: 'account',
                control: [
                    'accountEmail',
                    'accountPassword',
                    'creditCard'
                ]
            }
        ]
    },
    {
        name: 'Gerente',
        keys: [
            {
                name: 'profile',
                control: [
                    'phone',
                    'names'
                ]
            },
            {
                name: 'account',
                control: [
                    'accountEmail',
                    'accountPassword',
                    'creditCard'
                ]
            },
            {
                name: 'user',
                control: [
                    'registerUser',
                    'updateUser',
                    'deleteUser'
                ]
            },
            {
                name: 'store',
                control: [
                    'registerStock',
                    'updateStock',
                    'deleteStock'
                ]
            }
        ]
    }
];
export const JWTAUTH = new JWTAuthManager();