/***** IMPORTS  *****/
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import firebase from 'firebase/app';
import {isError, removeEmpty, removeUndefined, isEmpty, sortObjectArray} from '../actions/actions';
import {genObject} from '../../interfaces/IGeneral'
import config from '../../config.json'


/***** GLOBAL VARIABLES *****/
//const env = process.env;

//Firebase configuration
const firebaseConfig = config.firebase;


//Initilize firebase
firebase.initializeApp(firebaseConfig);
// Firebase database-object
const database = firebase.firestore();


/***** FUNCTIONS *****/

export const getToken = (): Promise<any | Error> => {

    const token: Promise<any> = new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user: any) => {
            if(!user) return resolve(new Error('Bruker er ikke innlogget...'));
            if(isError(user)) return resolve(new Error('Feil ved brukerautentisering: ' + user.message));

            user.getIdToken().then((token: any) => resolve(token));
           
        });
    });

    return token;
}

/**
 * Processes response from Firebase FireStore.
 * @param {genObject} data Data from FireStore.
 * @return {Promise<genObject>} 
 *  - Promise that resolves to human-readable data-object.
 */
const processData = async (data: genObject): Promise<genObject> => {

    if(!data) return {};

    //Variable for holding the result-object.
    let result: any;

    // Check what kind of Firestor-object has been passed, 
    // process it, and assign to result.
    if(data.exists) result =  await data.data();
    if(data.parent) result =  await data.get()
        .then((response: genObject) => response.data());
    if(data.query) result =  await processQuery(data);

    //If the processed object is another FireStore-object, process this too.
    if(result && (result.exists || result.parent || result.query)) 
        return await processData(result);

    //Return processed result-object.
    return await format(result);
}


/**
 * Format processed data from FireStore.
 * @param {genObject} data Processed FireStore-data from processData-function.
 * @return {genObject} A promise that resolves to a formated FireStore data-object. 
 */
const format = async (data: genObject): Promise<genObject> => {
    
    //Variable for holding the formated data.
    const result: any = {};

    //Check if data contains any values.
    if(!data) return result;

    //Process each key and value in object.
    // (lint-error on 'Object.entries' is wrong. This works!)
    Object.entries(data).forEach(async (item: any) => {
        //Assign key and value to variables.
        const key = item[0];
        const value = item[1] ? item[1] : {};

        //Check if value is a FireStore-object...
        if(value.exists || value.parent || value.query) {
            //...if so, send it back to ProcessData-function.
            result[key] = await processData(value);
        } else {
            //...else check if  value is an object, and send it back into format-function if it is.
            result[key] = typeof value === 'object'
                ? await format(value)
                : value;
        }
    });

    //Return result-object.
    return await result;
}


/**
 * Process FireStore query-object.
 * @param {genObject} data A FireStore-query-object.
 */
const processQuery = async (data: any) => {
    //If data is not a FireStore query-object, return error.
    if(!data.query) return new Error('Not a firestorm query-object...');
    
    //Variable for holding result.
    const result: any = {};
    
    //Iterate through query-object.
    data.forEach(async (item: any) => {

        const article = {...await item.data()};

        //Get data from query-item and assign it to value-key in result-object.
        if(!article.created) 
            article.created = (item._document?.version?.timestamp?.seconds || 0) * 1000;

        result[item.id] = article;
    });

    //Return processed qury-data.
    return await result;
} 


/***** OBJECTS *****/

//Default collection-object.
export const collections = {

    /*** Getters ***/


    /**
     * Get FireStore document-object.
     * @param {string} docName - OPTIONAL - Name of FireStore-document.
     * @return {genObject} Firestore document-object.
     */
    doc: function(docName?: string): genObject {
        return docName
            //@ts-ignore
            ? this.db.doc(docName)
            //@ts-ignore
            : this.db.doc();
    },


    /*** Methods ***/

    /**
     * CREATE: Writes new data to the collection.
     * @param {genObject} data Data to be written to the collection.
     * @return {Promise<genObject>} Promise that resolves to created-object.
     */
    create: async function(data: genObject): Promise<any> {
        
        //data.created = Date.now();
        delete data.id;

        console.log(data)
        //@ts-ignore
        const newItem: any = await this.db.add(data)
            .catch((error: any) => error);

        console.log(newItem.id)
        
        const id = newItem.id;

        //Asign processed data to a variabel.
        return {...await processData(newItem), id};
    },


    /**
     * READ: Returns data from collection in FireStore.
     * @return {any} Collection-spesific formated data-object.
     */
    read: async function (docName?: string): Promise<genObject> {

        //Get data from FireStore.
        const response = docName
            ?   await this.doc(docName).get()
                    .catch((error: any) => error)
            //@ts-ignore
            :   await this.db.get()
                    .catch((error: any) => error);

        //Check for error
        if(response.error) return response;

        //Asign processed data to a variabel.
        const processedData = await processData(response);

        //Return collection-formated data
        //@ts-ignore
        return await this.format(processedData);
    },

    
    /**
     * UPDATE: Updates items in collection.
     * @return {any} Collection-spesific formated data-object.
     */
    update: async function (docName: string, data: genObject, doMerge: boolean = false) {

        //Get data from FireStore.
        const response = doMerge
            ?   await this.doc(docName).set(data, {merge: true})
                    .catch((error: any) => error)
            :   await this.doc(docName).set(data)
                    .catch((error: any) => error);

        //Check for error
        if(isError(response)) return response;

        return true;
    },

    /**
     * UPDATE: Updates items in collection.
     * @return {any} Collection-spesific formated data-object.
     */
    delete: async function (docName: string) {

        const response = await this.doc(docName).delete()
            .catch((error: any) => error)

        //Check for error
        //if(!response) return {error: 'Item not found...'};
        if(isError(response)) return {error: response.message};

        return true;
    },
};


/* FireStore objects checks...
    result.exists => result.data();
    result.parent => result.get().then((response) => response.data());
    result.query => processQuery(data);
*/

/*** Settings-object ***/
export const settingsObj = {
    ...collections, 
    dbName: 'settings',
    
    /**
     * GETTER: Gets database-object for collection.
     * @return {object} Database-object
     */
    get db(): any {
        return database.collection(this.dbName)
    },   

    format: function(data: genObject): genObject {
        return data;
    },
};


/*** Articles-object ***/
export const articlesObj = {
    ...collections,
    dbName: 'articles',


    /**
     * GETTER: Gets database-object for collection.
     * @return {object} Database-object
     */
    get db(): any {
        return database.collection(this.dbName)
    },


    /**
     * READ: Returns data from collection in FireStore.
     * @return {any} Collection-spesific formated data-object.
     */
    read: async function (all: boolean = false, docName?: string) {

        const operator = all ? '<=' : '==';

        //Get data from FireStore.
        const response = docName
            ?   await this.doc(docName).where('publish', operator, true).get()
                    .catch((error: any) => error)
            :   await this.db.where('publish', operator, true).get()
                    .catch((error: any) => error);

        
        
        //Check for error
        if(response.error) return response;

        //Asign processed data to a variabel.
        const processedData: any = await processData(response);
        const formatedData = await this.format(processedData);
        const sortedData = sortObjectArray(formatedData, 'created', 'desc');

        //Return collection-formated data
        return isError(sortedData)
            ? []
            : sortedData;
    },


    /**
     * Method for formatting article.
     * @param {genobject} data Data to format
     * @return {Promise<Array<genObject>>} Promise that resolves to a correctly formatted IArticle.
     */
    format: async function(data: genObject): Promise<Array<genObject>> {
        const collection: Array<genObject> = Object.entries(data).map((entrie: any) => {
            
            const thisData: genObject = entrie[1];

            const imageTemp1 = !isEmpty(thisData.article) && thisData.article.split('src="');
            const imageTemp2 = imageTemp1[1] && imageTemp1[1].split('" alt');
            const image = imageTemp2 && imageTemp2[0];
        
            const article: genObject = {
                id: removeEmpty(entrie[0]),
                article: removeEmpty(thisData.article),
                contact: removeEmpty(thisData.contact),
                author: removeEmpty(thisData.author),
                caption: removeEmpty(thisData.caption),
                created: removeEmpty(thisData.created),
                image: image ? image : thisData.image,
                lead: removeEmpty(thisData.lead),
                publish: !thisData.publish || isEmpty(thisData.publish) ? false : true,
                slug: removeEmpty(thisData.slug),
                title: removeEmpty(thisData.title),
            }

            return removeUndefined(article); 
        });

        return collection;
    },
}


/*** Articles-object ***/
export const pagesObj = {
    ...collections,
    dbName: 'pages',

    /**
     * GETTER: Gets database-object for collection.
     * @return {object} Database-object
     */
    get db(): any {
        return database.collection(this.dbName)
    },


    /**
     * READ: Returns data from collection in FireStore.
     * @return {any} Collection-spesific formated data-object.
     */
    read: async function (query?: genObject) {

        const queryEntry = query
            ? Object.entries(query)[0]
            : null;

        //Get data from FireStore.
        const response = queryEntry
            ?   await this.db.where(queryEntry[0], '==' , queryEntry[1]).get()
                .catch((error: any) => error)
            :   await this.db.get()
                .catch((error: any) => error);

        //Check for error
        if(response.error) return response;

        //Asign processed data to a variabel.
        const processedData = await processData(response);

        //Return collection-formated data
        return await this.format(processedData);
    },


    /**
     * Method for formatting a page-object.
     * @param {genObject} data Data to be formatted.
     * @return {Promise<Array<any>>} Promise that resolves to an array of page-items.
     */
    format: async function(data: genObject): Promise<Array<any>> {
        const collection: Array<any> = Object.entries(data).map((entrie: any) => {
            const thisData = entrie[1];
            
            const thisPage = {
                id: removeEmpty(entrie[0]),
                title: removeEmpty(thisData.title),
                article: removeEmpty(thisData.article),
                contact: removeEmpty(thisData.contact),
                created: removeEmpty(thisData.created),
                image: removeEmpty(thisData.image),
                caption: removeEmpty(thisData.caption),
                slug: removeEmpty(thisData.slug),
                menuTitle: removeEmpty(thisData.menuTitle),
                menuParent: removeEmpty(thisData.menuParent),
            }


            return removeUndefined(thisPage); 
        });

        return collection;
    },
}


/**
 * Foction for logging admin-user into page.
 * @param {string} username Username to log in.
 * @param {string} password Password to use in login.
 * @return {Promise<Error | undefined>} Promise that resolves to undefined if login is successfull, or Error if it is not.
 */
export const loginAction = async (username: string, password: string) => {
    let loginError: any = null;
    const login = await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => firebase.auth().signInWithEmailAndPassword(username, password))
        .catch((error) => {
            loginError = error;
        });

    return loginError
        ? loginError
        : login;
}


/**
 * Functtion for checking if admin-user is alredy logged in.
 * @param {Function} setIsLoggedIn Function for setting login-status in state.
 * @return {Promise<boolean>} Promise that resolves to true if user is logged in, or false if they are not.
 */
export const checkLoginAction = async (setIsLoggedIn: Function): Promise<boolean> => {
    const result: Promise<boolean> = new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user: any) => {
            if(user) {
                setIsLoggedIn(true);
                resolve(true);
            } else {
                setIsLoggedIn(false);
                resolve(false);
            }

            reject(Error('Could not resolve login'));
        });
    });

    return result;
}


/**
 * Function for logging user out of Admin-pages.
 * @return {void} TODO: Return something indicating if logout was successfull.
 */
export const logoutAction = async () => {
    const logout = await firebase.auth().signOut()
        .catch((error: any) => console.log('Du ble ikke logget ut: ', error.message));

    console.log(logout);
}


/**
 * Function for uploading file to backend.
 * @param {any} file Filedate to be updated. 
 * @param {string} fileName Name of file to save. 
 */
export const uploadeFile = async (file: any, fileName: string) => {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(fileName);
    
    await imageRef.put(file);

    const path = await imageRef.getDownloadURL();


    return path;

}


/**
 * Get filepath from FireStore.
 * @param {string} filePath Path to file to get.
 * @return {string} Path to file, or empty string if error. 
 */
export const readFile = (filePath: string): any => {
    const storage = firebase.storage()
    const imageRef = storage.ref(filePath);
    let fileError = '';
    const imagePath = imageRef.getDownloadURL();
    imagePath.catch((error: any) => fileError = error)

    return fileError ? '' : imagePath;
}
