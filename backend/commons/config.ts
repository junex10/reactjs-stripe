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
    },
    {
        name: 'Gerente',
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
            {
                view: 'management'
            }
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
                    'names',
                    'spentReport'
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
            },
            {
                name: 'management',
                control: [
                    'store',
                    'clients'
                ]
            }
        ]
    }
];
export const JWTAUTH = new JWTAuthManager();
export const APIKEYSTRIPE = "sk_test_51Jth11A7sSACybeEVVUjp6IM8m7usDASJJs1yR4WeHhcOJwZkyoSlLEewHqmSdhgDBHkC6TiUfWVDGWTPsoxaFNh00POh1BrxU";
export const APIVERSIONSTRIPE = '2020-08-27';