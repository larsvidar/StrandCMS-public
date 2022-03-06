import { isError } from "../../Handler/actions/actions";
import { uploadedFile } from "../../Handler/crudder/firebaseHandler";


        
export const processFileForm = (data: FormData, isArticle: boolean) => {        
    //Get ans save file to back-end.
    const file: any = data.get('image');
    if(file.size) {
        const fileResponse: any = isArticle
            ? uploadedFile(file, 'article/' + file.name)
            : uploadedFile(file, 'page/' + file.name);

        if(isError(fileResponse)) {
            //setMessage('Error while saving file: ', fileResponse);
            return;
        } 
    }

    //Add path to image.
    // if(file.size) {
    //     postData.image = file.size ? 'article/' + file.name : '';
    // } else {
    //     postData.image = file.size ? 'page/' + file.name : '';
    // }
}


/**
 * EVENT: Load imagedata to state when user selects an image-file.
 *  (only reads one image).
 * @param {Event} event The file-input event-object.
 * @return {void} Sets image-data to the image-state.
 */
export const handleImage = (event: any, setImage: Function) => {
    //setShowLoader(true);
    //Get the file-element for the input-event-object.
    const image = event.target.files[0];

    //Make a new file-reader.
    //@ts-ignore
    const imageReader = new FileReader();

    // Add a listener that sets image-data to state when 
    // image-element is loaded.
    imageReader.onload = (file: any) => {
        setImage(file.target.result);
        //setShowLoader(false);
    };

    //Load image into file-reader.
    imageReader.readAsDataURL(image);
}
