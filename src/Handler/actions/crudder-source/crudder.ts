/***** IMPORTS *****/
import {genObject} from '../../../interfaces/IGeneral';
import {firebase} from './firebase/firebase';
import {localstorage} from './localstorage/localstorage';


interface ICrudder {
    framework: 'firebase' | 'localstorage' | '';
    config: genObject;
    status: string;
    client: genObject;
    create: any;
    read: any;
    update: any;
    delete: any;
    defaultMethod(framework: string): Error;
}


/***** CRUDDER *****/
export const crudder = (framework: string, config: genObject) => {
    const client = Object.assign({}, crudderObj);
    client.framework = framework.toLowerCase();
    client.config = config;
    client.client = getFramework(client.framework);
    client.client.config = client.config;

    if(client.client.create) client.create = client.client.create;
    if(client.client.read) client.read = client.client.read;
    if(client.client.update) client.update = client.client.update;
    if(client.client.delete) client.delete = client.client.delete;

    client.status = 'ok';
    return client as ICrudder;
};

const getFramework = (framework: string) => {
    //Checking framework-variable to find right framework.
    switch(framework) {
            
        //Return Firebase-framework
        case 'firebase': {
            const thisFirebase = firebase;
            return thisFirebase;
        }

        //Return Localstorage-framework (Default).
        case 'localstorage': {
            return new localstorage();
        }

        default: return Error('Framework ' + framework + ' not found!');
    }
};

const crudderObj: genObject = {
    status: 'not ready',

    create: async function() {return this.defaultMethod('create')},
    read: async function() {return this.defaultMethod('read')},
    update: async function() {return this.defaultMethod('update')},
    delete: async function() {return this.defaultMethod('delete')},

    defaultMethod: function(method: string) {return Error(this.framework + ' has no ' + method + '-method')},
};
