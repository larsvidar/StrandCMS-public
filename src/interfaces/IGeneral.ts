/***** TYPES *****/

//Generic object-type.
export type genObject = {
    [key: string]: any | string
};

/***** INTERFACES *****/
export interface IArticle {
    article: string,
    author: string,
    id: string,
    lead: string,
    publish: boolean,
    title: string,
    image: string,
    caption: string,
    slug: string,
    created: string,
    contact?: TContact,
}

export type TContact = 'contact' | 'member' | 'info' | 'none';

export interface IHistory {
    history: any,
    match: any,
    location: any,
}

export interface IBaseProps {
    className?: string,
    onClick?: any,
    onChange?: any,
    onSubmit?: any,
}