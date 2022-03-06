/***** IMPORTS *****/
import {genObject} from '../../../../interfaces/IGeneral';


/***** LOCAL-STORAGE-CLASS ***/
export class localstorage {

    /*** Constructor ***/
    // constructor() {
    //     this.create = this.create;
    //     this.read = this.read;
    //     this.update = this.update;
    //     this.delete = this.delete;
    // }


    /*** Methods ***/

    /**
     * 
     * @param collection 
     */
    create (collection: string) {
        return localStorage[collection] = '{}';
    }


    /**
     * 
     * @param collection 
     * @param field 
     */
    read (collection: string, field?: string) {
        return field
            ? JSON.parse(localStorage[collection][field])
            : JSON.parse(localStorage[collection]);
    }


    /**
     * 
     * @param collection 
     * @param data 
     */
    update (collection: string, data: genObject) {
        const existingData = JSON.parse(localStorage[collection]);
        const newData = {...existingData, ...data};
        return localStorage[collection] = JSON.stringify(newData);
    }


    /**
     * 
     * @param collection 
     * @param field 
     */
    delete (collection: string, field?: string) {

        if(field) {
            const existingData = localStorage[collection];
            const newData: any = {};
            for(const item in existingData) {
                if(item !== field) newData[item] = existingData[item];
            }
            return localStorage[collection] = JSON.stringify(newData);
        }
        return localStorage.removeItem(collection);
    }
}
