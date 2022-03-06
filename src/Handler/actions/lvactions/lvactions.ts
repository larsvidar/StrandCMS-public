/********** GENERAL FUNCTIONS ************/
/* Practical functions for everyday use. */
/*****************************************/

import { genObject } from '../../../interfaces/IGeneral';

/***** IMPORTS *****/
//import html2canvas from 'html2canvas';



/***** FUNCTIONS-OBJECT *****/ 

export const lvactions = {
    /**
     * Formats a string into a link-friendly format.
     * @param {string} link string to be formatted
     * @return {string} the formatted string.
     */
    stringifyLink: (link: string): string => {
        if(link) {
            let newLink = link.toLowerCase()
                .replace(/ø/g, 'o')
                .replace(/æ/g, 'e')
                .replace(/å/g, 'a');
            newLink = newLink.replace(/[^a-z0-9\s]/g, '');
            return newLink.replace(/\s/g, '-');
        }
        return 'Undefined';
    },


    /**
     * Makes the first character in a string uppercase.
     * @param {string} text string to be formatted.
     * @return {string} text with uppercase first char.
     */
    capitalize: (text: string): string => {
        if(text) {
            const textArray = text.split('');
            textArray[0] = textArray[0].toUpperCase();
            return textArray.join('');
        } else {
            return '';
        }
    },


    /**
     * Adds zero in front of a number if it is lower than 10.
     * @param {number} number to add zero to.
     * @return {string} zerofied-number as string.
     */
    addZero: (number: number): string | 0 => {
        if(typeof number !== 'number') return 0;
        
        return number < 10 && number > -1
            ? '0' + Math.floor(number).toString()
            : Math.floor(number).toString();
    },


    /**
     * Converts minutes to a string of hours and minutes.
     * @param {number} minutes to be converted.
     * @return {string} Formatted string (eg. 2t 5m)
     */
    toHours: (minutes: number) => {
        //Language locale
        const lang = {
            minutesShort: 'm',
            hoursShort: 't',
        };

        if(!minutes) return '0 ' + lang.minutesShort;

        return `${Math.floor(minutes/60) 
            ? Math.floor(minutes/60) + lang.hoursShort + ' '
            : ''}${minutes % 60 === 0 ? '' : minutes % 60 + lang.minutesShort}`;
    },


    /**
     * Gets file (from formData) and reduces the longest size of the image to 300px.
     * @param {any} file from formData to be reduced.
     * @return {any} New formData with the reduced image as 'files'.
     */
    resizeImage: (file: any, blob = false) => {
        //TODO: Check that it is actually an image file that is passed.

        //Function for calculating new size of image.
        const getNewSize = (width: number, height: number) => {
            return width >= height
                ? [300, height / (width / 300)]
                : [width / (height / 300), 300];
        };

        /* Variables */
        const fileName = file.name.split('.')[0]; //get filename from file (except filetype).
        const image = new Image(); //Make new image.
        image.src = URL.createObjectURL(file); //Setting passed file as image-source.
        const canvas = document.createElement('canvas'); //Make new canvas-element.
        const ctx: any = canvas.getContext('2d'); //Get context from canvas.

        //Returning a promise that resolves to the new form-data (with the resized image).
        return new Promise((resolve) => {
            //Listener for when source is loaded into image.
            image.onload = () => {
                //Getting the new size of the image.
                const newSize = getNewSize(image.width, image.height);
                //Setting the canvas to the new image size. 
                canvas.width =  newSize[0];
                canvas.height =  newSize[1];
                //Drawing the image on the canvas with the new size.
                ctx.drawImage(image, 0, 0, newSize[0], newSize[1]);

                //Making new form-data.
                const formData: any = new FormData();
                
                //Getting the image from the canvas, and appending it to form-data.
                if(blob) {
                    canvas.toBlob(async (blob: any) => {
                        //formData.append('files', blob, fileName + '.png');
                        //Resolve when new formData is finished.
                        const file = new File([blob], fileName + '.png', { type: 'image/png' });
                        resolve(file);
                    });
                } else {
                    canvas.toBlob(async (blob: any) => {
                        formData.append('files', blob, fileName + '.png');
                        //Resolve when new formData is finished.
                        resolve(formData);
                    });
                }
            };   
        });
    },


    /**
     * Function for comparing values in two arrays and returning duplicate values.
     * @param {Array<any>} arr1 - First array to be compared.
     * @param {Array<any>} arr2 - Second array to be compared.
     * @return {Array<any>} Array of duplicate values from both arrays.
     */
    compareArray: (arr1: any, arr2: any) => {
        return arr1.filter((value: any) => {
            return arr2.includes(value);
        });
    },


    /**
     * Sorts an array of object based on values in passed key.
     * @param {Array<object>} array - Array of objects to be sorted.
     * @param {string} key to be sorted by.
     * @param {string='asc'} sort - Optional - Sort order: 'asc' or 'desc'. Default = 'asc'. 
     * @return {Array<object> | Error} New array of sorted objects (or error-object).
     */
    sortObjectArray: <T extends Record<string, unknown>,>(array: T[], key: string, sort = 'asc'): T[] | Error => {
        //If array is empty, just return array.
        if(!array?.length) return array || [];

        //Checking if passed array has objects with passed key.
        const valueObject: genObject = array?.[0];
        if(valueObject?.[key] !== undefined) {
            
            //Returns sorted array
            return [...array].sort((a: any, b: any) => {
                
                //Checking sort-order.
                const sortFactor = sort.toLowerCase() === 'asc' ? 1 : -1;
                
                //Converting to lower-case if property is string.
                const value1 = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
                const value2 = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

                //comparing values.
                return value1 > value2
                    ? sortFactor
                    : -sortFactor;
            });

        //If array don't have object, or object don't have passed key, return error-object.
        } else {
            return new Error(`Not an object, or key don't exist on object.`);
        }
    },


    /**
     * Checks if item is a string.
     * @param {*} value Value to be checked.
     * @return {boolean} Returns true if string, false if not.
     */
    stringCheck: (value: any): boolean => {
        return typeof value === 'string'
            ? true
            : false;
    },


    /**
     * Gets duration since passed date.
     * @param {number} date Date to count from (UNIX epoch).
     * @param {boolean} short If true, a short-form of the string will be returned.
     * @return {string} A string telling how long ago passed date was.
     */
    getTimeSince: (date: number, short = false): string => {
        //Get todays date.
        const today: number = Date.now();

        //Get milliseconds since passed date.
        const time: number = today - date;

        //Convert milliseconds to a human-readable string.
        //Seconds...
        const seconds: number = time / 1000;
        if(seconds < 60) return short
            ? `${Math.round(seconds)} s`
            : `${Math.round(seconds)} sekunder siden`;

        //Minutes...
        const minutes: number = seconds / 60;
        if(minutes < 60) return short
            ? `${Math.round(minutes)} m`
            : `${Math.round(minutes)} minutter siden`;

        //Hours...
        const hours: number = minutes / 60;
        if(hours < 24) return short
            ? `${Math.round(hours)} t`
            : `${Math.round(hours)} timer siden`;

        //Days...
        const days: number = hours / 24;
        if(days < 7) return short
            ? `${Math.round(days)} d`
            : `${Math.round(days)} dager siden`;

        //Weeks...
        const weeks: number = days / 7;
        if(weeks < 4) return short
            ? `${Math.round(weeks)} u`
            : `${Math.round(weeks)} uker siden`;

        //Months...
        const months: number = days / 30.35;
        if(months < 12) return short
            ? `${Math.round(months)} mnd`
            : `${Math.round(months)} måneder siden`;
        
        //Years...
        const years: number = days / 364.25;
        return short 
            ? `${Math.round(years)} år`
            : `${Math.round(years)} år siden`;
    },


    /**
     * Checks if passed value is an error-object.
     * @param {any} value Value to be checked.
     * @return {boolean} True if error, false if not.
     */
    isError: (value: any): value is Error => value instanceof Error
        ? true
        : value && value.error
            ? true
            : value?.meta?.error
                ? true
                : false,


    /*** Escaping inputs ***/
    // const hasInvalidChars = /^.*?(?=[\+\^#%&$\*:<>\?/\{\|\}\[\]\\\)\(]).*$/g.test(
    //     inputValue,
    //   )


    /**
     * Formats dates to DD.MM.YYYY format.
     * @param {string | number} rawDate The date to format.
     * @param {'week' | 'month' | 'year'} addPeriod 
     *  - Add a period of a week, a month or a year.
     * @return {string} Formatted date-string. 
     */
    formatDate: (rawDate: string | number, addPeriod?: 'week' | 'month' | 'year',): string => {

        //Process date to format.
        let dateNumber:string | number = rawDate;
        if (typeof rawDate === 'string' && rawDate.length < 13 && !isNaN(+rawDate)) 
            dateNumber = +(rawDate + '000');
        if (typeof rawDate === 'number' && rawDate < 1000000000000) 
            dateNumber = rawDate * 1000;

        //Make a date object.
        const date: Date = new Date(+dateNumber);

        //Add timeperiod if specified.
        switch(addPeriod) {
            case 'month': date.setMonth(date.getMonth() + 1);
        }

        //Return date as a DD.MM.YYYY string.
        return date.toLocaleDateString('no-NB', {
            day: '2-digit', month: '2-digit', year: 'numeric',
        });
    },


    /**
     * Gets rounded percent of one number to another.
     * @param {number} number Number to turn into percent-number.
     * @param {number} totalNumber Number to calculate percent from.
     * @return {number} Percent of number from totalNumber.
     */
    getPercent: (number: number, totalNumber: number): number => {
        return Math.round(number / (totalNumber / 100));
    },


    //TODO: This function isn't used anymore.
    /**
     * Sets isFetching to true while getting data from network-call.
     * @param {Function} fetchFunction Fetch-function
     * @param {Function} setIsFetching Function for setting value of isFetching.
     * @ {Function} New function that sets isFetching.
     */
    setFetch: (fetchFunction: any, setIsFetching: any) => {
        return async (...values: any) => {
            setIsFetching(true);
            const result = await fetchFunction(...values);
            setIsFetching(false);
            return result;
        };
    },


    /**
     * Get url-slug from a path-string.
     * @param {string} path path-string to get slug from
     * @return {string} Return slug as a string.
     */
    getSlug: (path: string): string => {

        //Spilt string into array
        const pathArray: Array<string> = path.split('/');

        //Get slug from end of array.
        const slug: string | undefined = pathArray.pop();

        //Return slug
        return slug ? slug : '';
    },


    /**
     * TODO: IMPORT html2canvas
     * Making a PDF-file or image of passed HTML-element (Only image works now).
     * @param element Html-element to make PDF or image from.
     * @return {Promise<void>} Returns nothing.
     */
    // makePdf: async (element: HTMLElement, name: string): Promise<void> => {

    //     element.style.width = '1110px';
    //     element.style.height = '633px';

    //     //Making an png-image from div.
    //     const canvas: HTMLCanvasElement = await html2canvas(element);
    //     const image: string = canvas.toDataURL('image/jpeg');
        
    //     const downloadRef: HTMLAnchorElement = document.createElement('a');
    //     downloadRef.href = image;
    //     downloadRef.download = name +'.jpg';
    //     downloadRef.click();
    // },


    /**
     * Function for turning a query-string into an object.
     * @param {string} queryString Query-string to convert.
     * @return {object} 
     */
    parseQuery: (queryString: string) => {
        //Variable for holding final result.
        const queryObject: any = {};

        //Check if queryString is not empty, and actually a string.
        if(!queryString || typeof queryString !== 'string') return {single: ['']}; //new Error('No query-string found.');
        
        //Split query-string from rest of url, and check for errors.
        const query: Array<string> = decodeURI(queryString).split('?');

        //if(!query[1]) return new Error('Not a valid query-string.')

        //Split into individual key-value pairs.
        const queryArray: Array<string> = query[1]
            ? query[1].split('&')
            : query[0].split('&');
        
        //Iterate through key-pairs and adding them to queryObject.
        queryArray.forEach((item, index) => {
            const itemArray = item.split('=');
            
            //If value is present, add it to queryObject...
            if(itemArray[1]) {
                let item: string | string[] = '';
                
                try {
                    item = JSON.parse(itemArray[1]);
                } catch(thisError) {
                    item = itemArray[1];
                }

                queryObject[itemArray[0]] = item;
                
            //If not, just push string into the single-item.
            } else {
                if(!queryObject.single) queryObject.single = [];
                queryObject.single[index] = itemArray[0];
            }
        });

        return queryObject;
    },


    /**
     * Checks if a value is empty or not.
     * Empty objects or arrays, and undefined, null, NaN are all considered empty in this function.
     * Falsy values like 0, '' or false is not considered empty.
     * @param {any} data data to check.
     * @return {boolean} True if empty, false if not.
     */
    isEmpty: (data: any) => {
        if([undefined, null, NaN].includes(data)) return true;
        if(typeof data === 'object') {
            if(Array.isArray(data)) return !data.length;

            const keys = Object.keys(data);
            return !keys.length;
        }

        return !data;
    },


    /**
     * Removes undefined, null and NaN values from objects.
     * @param {object} data Object to check for undefined values.
     * @return {object} Filtered object without undefined values. 
     */
    removeEmpty: (data: any) => {
        if(typeof data !== 'object' || Array.isArray(data)) return data;
        const keys: string[] = Object.keys(data);

        const newObject: any = {};
        keys.forEach((key: string) => {
            const value = data[key];
            if(!value) if(![false, 0].includes(value)) return;

            const type = typeof value;
            if(type === 'object') {
                if(Array.isArray(value)) if(!value.length) return;
                if(!Object.keys(value).length) return;
            }

            newObject[key] = value;
        });

        return newObject;
    },


    /**
     * Simple sleep-function that can be used in async-functions.
     * @param {number} ms Number of milliseconds to wait for.
     * @return {Promise<undefined>} Returns empty promise that are resolved after passed number of milliseconds. 
     */
    sleep: (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },


    /**
     * Checks if a value is empty or error.
     * @param {*} value Value to be checked
     * @return {boolean} True if valid, false if empty or error.
     */
    isValid: (value: any): value is any => {
        return !value || lvactions.isEmpty(value)
            ? false
            : lvactions.isError(value)
                ? false
                : true;
    },


    /**
     * Tries to get image-date from passed url (won't work if cors is required).
     * @param {string} url Url to get image from.
     * @param {string} fileName Filename to use for file.
     * @param {string} fileType Filetype to use for file.
     * @return {Promise<File>} A promise that resolves to a file-object.
     */
    getFileFromUrl: async (url: string, fileName: string, fileType = 'image/jpg'): Promise<File> => {
        const response: any = await fetch(url, {mode: 'cors'}).then((thisResponse) => thisResponse.blob());
        const file = new File([response], fileName, { type: fileType });
        return file;
    },


    /**
     * Function for paginate an array. Fetches item from a source array, which is affected directly. 
     * @param {any[]} source Source-array to paginate from.
     * @param {number} quantity Number of items to get each time
     */
    paginateArray: (source: any[], quantity: number) => {
        const target = [];
        for(let i = 0; i < quantity; i++) {
            if(!source.length) break;
            target.push(source.pop());
        }

        return target;
    },


    /**
     * Function for setting console.time-message
     * @param {string} text Text to display in console
     * @param {boolean=} end If true, defines end-message.
     * @return {void}
     */
    setTime: (text: string, end?: boolean) => end 
        ? console.timeEnd(text) 
        : console.time(text),


    /**
     * Function for sorting an target-array based on the order of a source-array
     * @param {T[]} targetArray Array to be sorted
     * @param {any[]} sourceArray Array with values to sort after.
     * @param {string} compareKey Key to get value from targetArray.
     * @return {T[]} Sorted array.
     */
    sortFromArray: <T extends {[x: string]: any},>(targetArray: T[], sourceArray: any[], compareKey: string): T[] => {
        const target: T[] = [];

        sourceArray.forEach((item) => {
            const [matchingItem] = targetArray.filter((thisItem: T) => {
                return item === thisItem[compareKey];
            });
            if(matchingItem) target.push(matchingItem);
        });
        
        return target;
    },


    /**
     * 
     * @param data 
     * @param type 
     */
    noError: (data: any, type: string) => {
        if(!lvactions.isError(data)) return data;
        
        switch(type) {
            default: return {};
            case 'string': return '';
            case 'number': return 0;
            case 'array': return [];
            case 'boolean': return false;
        }
    },


    mergeObjects: (mainObject: any, secondaryObject: genObject) => {
        const newObject = {...secondaryObject};

        for(const key in mainObject) {
            newObject[key] = mainObject[key] || '';
        }

        return newObject;
    },


    /**
     * Returns an object with a 'clearAll' method. 
     *  -Timeout-ids can be stored in det object, and clearAll will clear every timeout.
     * @return {object} Object with clearAll-method
     */
    getTimeoutObject: () => {
        return {
            //Method for clearing all timeouts stored in object.
            clearAll: function() {
                Object.keys(this).forEach((key) => {
                    if(key !== 'clearAll') {
                        clearTimeout(this[key]);
                        delete this[key];
                    }
                });
            }
        } as genObject;
    },


    /**
     * 
     */
    handleErrors: (data: any): Error => {
        console.log('RAW-ERROR: ', data);
        if(!data) return Error('No data!');
        if(data instanceof Error) return data;
        if(data.error) {
            if(data.error.message) return Error(data.error.message);
            if(typeof data.error === 'string') return Error(data.error);
        }
        return Error('Unknown error: ' + JSON.stringify(data));
    }

};
