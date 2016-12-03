/*globals fetch*/
import 'isomorphic-fetch';
import WPAuth from './WPAuth';
import WPRequest from './WPRequest';

const {CLIENT_ID, CLIENT_SECRET, WP_USERNAME, WP_PASSWD, WP_URL} = process.env;
const auth = new WPAuth({
  username: WP_USERNAME,
  password: WP_PASSWD,
  client_secret: CLIENT_SECRET,
  client_id: CLIENT_ID
});

const WP = new WPRequest(auth, WP_URL);

/**
 * Retrieve all posts
 *
 * @param  {Object} _        The result returned from the resolver on the parent
 *                           field, or, in the case of a top-level Query field,
 *                           the rootValue passed from the server configuration.
 *                           This argument enables the nested nature of GraphQL
 *                           queries.
 * @param  {String} category The category slug if provided
 * @return {Promise}         A Promise that resolves to an array of Posts
 */
export const posts = (_, {category}) => {
  let catId = null;
  if(category){
    const query = `slug=${category.toLowerCase()}`;
    const cats = Promise.await(WP.fetch('categories', query));
    catId = cats.length ? cats[0].id : null;
  }
  return WP.fetch('posts', catId ? `categories=${catId}` : null);
};

/**
 * Retrieve a single post by id or slug
 * @param  {Object} _    The result returned from the resolver on the parent
 *                       field, or, in the case of a top-level Query field,
 *                       the rootValue passed from the server configuration.
 *                       This argument enables the nested nature of GraphQL
 *                       queries.
 * @param  {String} id   The id of the post
 * @param  {String} slug The slug of the post
 * @return {Promise}     A Promise that resolves to a Post object
 */
export const post = (_, {id, slug}) => {
  if (id) {
    return WP.fetch(`posts/${id}`);
  }
  if (slug) {
    return WP.fetch('posts', `slug=${slug}`)
      .then(posts => Promise.resolve(posts.length ? posts[0] : {}));
  }
}

/**
 * Retrieves all categories used in Blog
 *
 * @return {Promise} Returns a Promise that resolves to an array of Categories
 */
export const categories = () => WP.fetch(`categories`);

/**
 * Retrieves an author by id
 *
 * @param  {String} author author id
 * @return {Promise} A Promise that resolves to an Author Object
 */
export const author = ({author}) => WP.fetch(`users/${author}`);

/**
* Retrieves an category by id
*
* @param  {String} category author id
* @return {Promise} A Promise that resolves to an Category Object
*/
export const category = id => WP.fetch(`categories/${id}`);
