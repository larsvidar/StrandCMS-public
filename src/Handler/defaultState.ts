/***** IMPORTS *****/
import { ISettings } from "../interfaces/IState";


/***** DEFAULT STATE-OBJECTS *****/
export const defaultSettings: ISettings = {
    
    //Site-settings
    site: {
        siteTitle: 'StrandCMS',
        footer: 'Made with StrandCMS © 2020',
    },

    //Theme-values
    theme: {
        primaryColor: '#246599',
        primaryText: '#ffffff',
        secondaryColor: '#2d6075',
        secondaryText: '#ffffff',
        linkColor: '#88f',
        linkUnderline: true,
    },

    email: {
        subject: 'Informasjon om Strandkanten Bydel',
        text: 'This is an example of an mail-template.'  +
            'This text is sent from the "GetInfo"-form in StrandCMS.',
    },
}
