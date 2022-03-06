/**************************************************
 *   This is a script for downloading             *
 *   data from Firebase and store it locally.     *
 *                                                *
 *   The backup will be stored in the             *
 *   BACKUP-folder, under a sub-folder named      *
 *   after the date of the backup.                *
 *                                                *
 *   The backup will save each collection into a  *
 *   JSON-file, and stored files into the         *
 *   files-subfolder.                             *
 *                                                *
 **************************************************/

 
/***** IMPORTS *****/
const fs = require('fs');


/***** VARIABLES *****/

//Places all commandline arguments in an array (cutting away the two first default items).
const args = process.argv.slice(2);

//Placement of backup-folders.
const folder = '../BACKUP/'
//Make data-variable. Use date.toLocaleDateString().
const date = new Date(Date.now);
//Name of new backup-folder
const newFolderName = 'Strandkanten ' + date.toLocaleDateString();


/***** FUNCTIONS *****/

/**
 * Function for generate content for the .tsx file.
 * @param {string} baseFilename - The base name to create all filenames from.
 * @return {string} - The content to fill the file with. 
 */
function generateTSXContent(baseFilename) {
    const IProps = `I${baseFilename}Props`
    const SCSSModule = `${baseFilename}.module.scss`

    return (
`/***** IMPORTS *****/
import React from 'react';
import styled from 'styled-components';

const ${baseFilename}Styles = styled.div\`
        margin: 1em;
\`;


/***** INTERFACES *****/
interface ${IProps} {}


/***** COMPONENT-FUNCTION *****/
const ${baseFilename} = (props: ${IProps}) => {
    
    /*** Return-statement ***/
    return(
        <${baseFilename}Styles>
            <p>Content of this new component goes here!</p>
        </${baseFilename}Styles>
    );
}


/***** EXPORTS *****/
export default ${baseFilename};

`
);}


/**
 * Function for generate content for the IProps file.
 * @param {string} baseFilename - The base name to create all filenames from.
 * @return {string} - The content to fill the file with. 
 */
function generateIPropsContent(baseFilename) {
    const IProps = `I${baseFilename}Props`

    return (
`export default interface ${IProps} {

}`
    );}


/**
 * Function for generate content for the SCSS-module.
 * @param {string} baseFilename - The base name to create all filenames from.
 * @return {string} - The content to fill the file with. 
 */
function generateSCSSModule(baseFilename) {
    return (
`@import '../../styles/variables.scss';

.${baseFilename} {

}`
    );}


/**
 * Function for handeling errors in fs-operations
 * @param {object} error - The error-object returned from the operation.
 * @param {string} errorMessage (optional) - Message to display in case of error.
 * @param {string} successMessage (optional) - Message to display if operation is successfull.
 * @return {void} (Prints out to console directly).
 */
function fsStatus(error, errorMessage = "Error executing operation.", successMessage = "Operation executed successfully") {
    if(error) {
        console.log(errorMessage);
    } else {
        console.log(successMessage);
    }
}


/***** PROGRAM *****/

//Making a folder for the component
fs.mkdir(`${folder}/${args[0]}`, (error) => {
    fsStatus(error, error);
});

//Make .tsx file in folder
fs.writeFile(`${folder}/${args[0]}/${args[0]}.tsx`, generateTSXContent(args[0]), (error) => {
    fsStatus(error);
});

//Make SCSS-module file in folder
// fs.writeFile(`${folder}/${args[0]}/${args[0]}.module.scss`, generateSCSSModule(args[0]), (error) => {
//     fsStatus(error);
// });

// //Make IProps file in folder
// fs.writeFile(`${folder}/${args[0]}/I${args[0]}Props.tsx`, generateIPropsContent(args[0]), (error) => {
//     fsStatus(error);
// });
