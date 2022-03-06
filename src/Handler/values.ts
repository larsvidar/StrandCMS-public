/***** IMPORTS *****/
import { genObject } from "../interfaces/IGeneral";


/***** VALUE-OBJECT *****/
export const values: genObject = {
    productionUrl: 'http://strandkantenbydel.no',
    developmentUrl: 'http://localhost:8000/',
};

//Add baseUrl-value
values.baseUrl = values.productionUrl;
