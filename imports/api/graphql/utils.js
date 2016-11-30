import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes string fields of an object based on the keys
 *
 * @param  {Object: {_id, title, to, icon, featuredImage}} props
 * @return {Object: {_id, title, to, icon, featuredImage}}  cleaned object
 */
export function sanitizeStringFields(props){
  const descriptionOpts = {
      // only allow these tags
      allowedTags: ['b','i','em','strong','a','h2','h3', 'p', 'br', 'blockquote'],
      // and these attributes on them
      allowedAttributes: {
        '*': [ 'class', 'alt', 'style', 'title' ],
        'a': ['href', 'style', 'target', 'rel', 'title'],
        'img': ['src', 'alt']
      }
    },
    // text has no html
    textOpts = { allowedTags: false, allowedAttributes: false};
    // loop through each key of the object
    Object.keys(props).forEach(k => {
        // apply sanitization by key
        switch(k){
          case '_id':
          case 'title':
          case 'to':
          case 'icon':
          case 'featuredImage':
            props[k] = sanitizeHtml(props[k], textOpts);
          break;
          case 'description':
            props[k] = sanitizeHtml(props[k], descriptionOpts);
          break;
        }
    });
    // cleaned object
    return props;
}

/**
 * Simple utility method that returns a new object only with keys prescribed
 * in a given array.
 *
 * @param  {Array} propertyArray An array of valid properties as strings.
 * @param  {Object} sourceObj    The original object to validate against.
 * @return {Object}              A new object with the corresponding key/val pairs
 */
export function sanitizeByProperty(propertyArray, sourceObj){
  if(!Array.isArray(propertyArray) || !propertyArray.length)
    throw new Error("propertyArray needs an array of keys, non-array or empty array given");

  if(!Object.keys(sourceObj).length){
    throw new Error("sourceObj needs a non-empty object. Empty object given");
  }
  let params = {}
  propertyArray.forEach(k => !!sourceObj[k] && (params[k] = sourceObj[k]));
  return params;
}
