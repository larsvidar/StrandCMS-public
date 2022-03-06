/***** IMPORTS *****/
import {fetchData} from '../dataActions/dataActions';
import {isError} from '../../actions';
import {genObject} from '../../../../interfaces/IGeneral';


interface IFirebase {
    urls: genObject,
    config: genObject;
    login(email?: string, password?: string, token?: string): Promise<genObject | Error>,
    logout(): void,
    getToken(getRefreshToken?: boolean): string,
    create?(collection: string, data: genObject): genObject | Error,
    read?(collection: string): genObject | Error,
    update?(): genObject | Error,
    delete?(): genObject | Error,
    client?: genObject,
}


/***** FIREBASE-CLASS *****/
export const firebase: IFirebase = {

    config: {},

    get urls() {
        return {
            create: `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/documents/`,
            read: `https://firestore.googleapis.com/v1/projects/${this.config.projectId}/databases/(default)/documents/`,
            login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + this.config.apiKey,
            token: 'https://securetoken.googleapis.com/v1/token?key=' + this.config.apiKey,
        };
    },


    /*** Methods ***/

    /**
     * Method for logging in user to Firebase.
     *  - If email and password is not defined, then the method looks for passed token or token in localStorage.
     *  - This method can therefor be used both to log in and to confirm user.
     * @param {string=} email Optional! Email to log in with.
     * @param {string=} password Optional! Password.
     * @param {string=} token Optional! Refresh-token to get new idToken.
     * @return {Promise<object | Error>} Promise resolving to object containing idToken and refreshToken, or error.
     */
    async login(email?: string, password?: string, token?: string): Promise<genObject | Error> {

        //If email, password and token is undefined, try to get token from localStorage.
        if(!email && !password && !token) token = this.getToken(true);
        
        //Make data-object.
        const data = token 
            ? {refreshToken: token, grant_type:	'refresh_token'}
            : {email, password, returnSecureToken: true};

        //Send login-request. Url is conditionally based on if token is defined.
        const loginResponse = await fetchData(token ? this.urls.token : this.urls.login, data, {method: 'POST'});
        
        //If response is not an error, save idToken and Refresh-token to localStorage.
        if(!isError(loginResponse)) {

            //If response contains id_token and refresh_token instead of idToken and refreshToken, then replace them.
            if(loginResponse.id_token) loginResponse.idToken = loginResponse.id_token;
            if(loginResponse.refresh_token) loginResponse.refreshToken = loginResponse.refresh_token;
            delete loginResponse.id_token;
            delete loginResponse.refresh_token;

            //Save idToken and refreshToken to localStorage.
            if(loginResponse.idToken) localStorage.jwt = loginResponse.idToken;
            if(loginResponse.refreshToken) localStorage.refreshToken = loginResponse.refreshToken;
        } else {
            this.logout();
        }

        //Return loginResponse weather it's an error or not.
        return loginResponse;
    },


    /**
     * 
     */
    async logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('refreshToken');
    },


    /**
     * Method for getting token 
     * @param {boolean} getRefreshToken Optional! Returns refreshToken instead of idToken.
     * @return {string} Return token as a string.
     */
    getToken (getRefreshToken?: boolean): string {
        const jwt =  localStorage.jwt || '';
        return jwt.split('55555')[getRefreshToken ? 1 : 0];
    },


    /**
     * Method for creating a new collection in FireStore.
     * @param {string} collection 
     * @param {string} doc 
     * @param {genObject} data 
     */
    async create (collection: string, data: genObject) {
        const options = {
            method: 'POST',
            mode: 'cors',
        };

        const fields = formatFireData(data, true);
        const response = await fetchData(this.client?.urls.create + collection, fields, options);
        return response;
    },


    /**
     * 
     * @param collection 
     */
    async read (collection: string) {
        const jwt = localStorage.jwt;
        const headers = {Authorization: 'Bearer ' + jwt};
        const response = await fetchData(this.client?.urls.read + collection, undefined, jwt ? {headers} : undefined);

        return formatFireResponse({response, collection});
    },

    async update() {
        //TODO: Implement update functionality.
        return Error('Update-functionality not implemented in this framework yet.');
    }
};


/**
 * Function for formatting data to ready it for firestore-insertion.
 * @param {genObject} data Data to insert
 * @param {boolean} isTopLevel True if it is the top-level object being passed.
 * @return {genObject} A formatted object, ready to be inserted into firebase.
 */
const formatFireData = (data: genObject, isTopLevel = false) => {
    
    const type = typeof data;
    
    if(Array.isArray(data)) {

        const result: genObject = {arrayValue: {
            values: data.map((thisValue) => formatFireData(thisValue))
        }};

        return isTopLevel 
            ? {fields: {data: result}}
            : result;
    }

    if(type === 'object') {
        const fields: genObject = {};
        for(const key of Object.keys(data)) {
            const value = formatFireData(data[key]);

            fields[key] = value;
        }

        return isTopLevel 
            ? {fields}
            : {mapValue: {fields}};
    }

    return isTopLevel
        ? {fields: {[getType(data)]: data}}
        : {[getType(data)]: data};
};


/**
 * 
 * @param value 
 */
function getType<T>(value: T): string {

    let type: string = typeof value;
    if(type === 'number') type = 'integer';

    return type + 'Value';
}



/**
 * 
 * @param data 
 */
const formatFireResponse = (data: genObject) => {
    const {response, collection} = data || {};
    const {documents} = response || {};
    const documentsArray = documents || [];

    const thisResult = {[collection]: documentsArray.map((item: genObject) => {
        const result: genObject = {};
        const uidPath = item.name || '';
        result.uid = uidPath.split('/').reverse()[0];
        result.created = item.createTime;
        result.updated = item.updateTime;
        
        const fieldsObject: genObject = item.fields || {};
        const fields = formatFireFields(fieldsObject);

        return {...result, ...fields};
    })};


    return thisResult;
};


/**
 * 
 * @param value 
 */
function formatFireFields<T>(value: T): T {
    const FIRE_TYPES = [
        'nullValue',
        'booleanValue',
        'integerValue',
        'doubleValue',
        'timestampValue',
        'stringValue',
        'bytesValue',
        'referenceValue',
        'geoPointValue',
        'arrayValue',
        'mapValue',
        'fields',
        'values',
    ];
    const type = typeof value;

    if(type !== 'object') return value;
    if(Array.isArray(value)) {
        const valueArray = value.map((thisValue) => formatFireFields(thisValue));
        return valueArray as unknown as T;
    }

    let fields: genObject = {};
    const valueObject: genObject = value;
    
    Object.keys(valueObject).forEach((key) => {
        const thisValue = formatFireFields(valueObject[key]);
        if(FIRE_TYPES.includes(key)) fields = thisValue;
        else fields[key] = thisValue;
    });

    return fields as T;
}
