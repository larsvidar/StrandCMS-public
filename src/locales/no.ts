/***** IMPORTS *****/
import { genObject } from "../interfaces/IGeneral";


/***** NORWEGIAN *****/

const title = 'Strandkanten Bydel Tromsø';

export const no: genObject = {
    title: title,


    IndexPage: {
        title: title,
    },


    TopBar: {
        title: title,
    },


    /*** Main menu ***/
    Menu: [
        {title: "Nyheter", url: "/news/"},
        {title: "Informasjon", url: "/page/informasjon/", parent: "Informasjon"},
        {title: "Medlemmer", url: "/page/medlemmer/", parent: "Informasjon"},
        {title: "Styret", url: "/page/kontakt/", parent: "Informasjon"},
        {title: "Avfallshåndtering", url: "/page/avfall/", parent: "Informasjon"},
        {title: "Bomiljø", url: "/page/bomiljo/", parent: "Bomiljø"},
        {title: "Drivhusene", url: "/page/drivhus/", parent: "Bomiljø"},
        {title: "Havna", url: "/page/havna/", parent: "Bomiljø"},
        {title: "Basketballbanen", url: "/page/basket/", parent: "Bomiljø"},
        {title: "Medlemsskap", url: "/page/medlemsskap/"},

        //Husk News

        // {
        //     title: 'Nyheter',
        //     url: '/news/',
        // },



        // {
        //     title: 'Informasjon',
        //     subMenu: [
        //         {
        //             title: 'Informasjon',
        //             url: '/page/informasjon/',
        //         },
        //         {
        //             title: 'Medlemmer',
        //             url: '/page/medlemmer/',
        //         },
        //         {
        //             title: 'Kontakt styret',
        //             url: '/page/kontakt', 
        //         },
        //         {
        //             title: 'Avfallshåndtering',
        //             url: '/page/avfall',
        //         },
        //         // {
        //         //     title: 'Få informasjon',
        //         //     url: '/page/sendinfo',
        //         // },
        //     ],
        // },
        // {
        //     title: 'Bomiljø',
        //     subMenu: [
        //         {
        //             title: 'Bomiljø',
        //             url: '/page/bomiljo',
        //         },
        //         {
        //             title: 'Drivhus',
        //             url: '/page/drivhus',
        //         }, 
        //         {
        //             title: 'Havna',
        //             url: '/page/havna'
        //         }, 
        //         {
        //             title: 'Basketballbane',
        //             url: '/page/basket',
        //         },
        //     ]
        // },
        // {
        //     title: 'Medlemsskap',
        //     url: '/page/medlemsskap',
        // },
    ],


    ItemEditor: {
        title: 'Ny artikkel',
        labels: {
            title: 'Overskrift',
            lead: 'Ingress',
            article: 'Artikkel',
            author: 'Skrevet av:',
            publish: 'Publiser',
            submit: 'Lagre artikkel...',
            date: 'Dato',
            slug: 'Url-ending (fylles ut automatisk)',
        }
    },
};
