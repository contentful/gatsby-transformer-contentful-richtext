const { documentToHtmlString } = '@contentful/rich-text-html-renderer';
const {
  GraphQLString,
} = require(`gatsby/graphql`)

const htmlCacheKey = node =>
  `transformer-contentful-rich-text-html-${
    node.internal.contentDigest
  }-${pluginsCacheStr}-${pathPrefixCacheStr}`

const htmlCacheKey = node =>
  `transformer-contentful-rich-text-html-${
    node.internal.contentDigest
  }-${pluginsCacheStr}-${pathPrefixCacheStr}`

module.exports = (
  { type, store, pathPrefix, getNode, getNodes, cache, reporter },
  pluginOptions
) => {
  if (type.name !== `ContentfulRichText`) {
    return {}
  }

  return new Promise((resolve, reject) => {
    const {renderOptions} = pluginOptions
    async function getHTML(richTextNode) {
      const cachedHTML = await cache.get(htmlCacheKey(richTextNode))
      if (cachedHTML) {
        return cachedHTML
      } else {
        const html = documentToHtmlString(document, renderOptions)
        // Save new HTML to cache and return
        cache.set(htmlCacheKey(richTextNode), html)
        return html
      }
    }
    return resolve({
      html: {
        type: GraphQLString,
        resolve(richTextNode) {
          return getHTML(richTextNode)
        },
      }
    })
  })
}
