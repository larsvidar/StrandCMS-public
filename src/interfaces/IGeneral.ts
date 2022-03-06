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
};

export interface IHistory {
    history: any,
    match: any,
    location: any,
}

export interface IBaseProps {
    className?: any,
    onClick?: any,
}