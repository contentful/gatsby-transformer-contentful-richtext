# DEPRECATED
Please read this resource: [Using Rich Text with Gatsby](https://www.contentful.com/developers/docs/tutorials/general/rich-text-and-gatsby/) to get the correct way to render Rich Text content in Gatsby.

Package `@contentful/gatsby-transformer-contentful-richtext` no longer maintained and deprecated in favour of `gatsby-source-contentful` and `@contentful/rich-text-react-renderer`.

## Reasons for deprecation

We've built Rich Text with the idea that developers have full control over the presentation of the Rich Text documents.
Although Transformer Plugins are an excellent solution for the data transformation, it's not like that for the rendering:

- lack of flexibility: existing plugin api forces to have only one place for defining resolvers (in `gatsby-config.js`) which makes it impossible to influence rendering depending on the context (e.g. use different components in header and footer).

- no jsx support: it is not possible to use React Components inside `gatsby-config.js` file.

## Replacement

The long-term replacement for `@contentful/gatsby-transformer-contentful-richtext` is a combination of `gatsby-source-contentful` and `@contentful/rich-text-react-renderer` packages.

JSON output is accessible on the Rich Text Node, see example query:

```graphql
{
  allContentfulBlogPost {
    edges {
      node {
        bodyRichText {
          json
        }
      }
    }
  }
}
```

The following snippet shows a way to define how Rich Text document is rendered:

```js
import React from 'react';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const Bold = ({ children }) => <span className="bold">{children}</span>;
const Text = ({ children }) => <p className="align-center">{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
};

documentToReactComponents(node.bodyRichText.json, options);
```
