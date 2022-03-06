/***** IMPORTS *****/

import React, {FC} from 'react';
import Helmet from 'react-helmet';


interface ISeo {
  title: string,
  description?: string,
  lang?: string,
  meta?: any[],
}

const Seo: FC<ISeo> = ({title, description = '', lang = `en`, meta = []}) => {

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${title}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: 'author',
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat(meta)}
    />
  );
};

export default Seo;
