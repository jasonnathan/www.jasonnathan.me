/*globals fetch*/
import 'isomorphic-fetch';
import querystring from 'querystring';
import WPAuth from './Wordpress';

const resolve = (h) => Promise.resolve(h);
const {CLIENT_ID, CLIENT_SECRET, WP_USERNAME, WP_PASSWD, WP_URL} = process.env;
const auth = new WPAuth({
  username: WP_USERNAME,
  password: WP_PASSWD,
  client_secret: CLIENT_SECRET,
  client_id: CLIENT_ID
})


export const getWP = (endpoint, query) => {
  let ep = `${WP_URL}/${endpoint}`;
  ep += query ? `?${query}` : '';
  return auth
  .access_token()
  .then(token => fetch(ep, {
    Authorization:`Bearer ${token}`,
    compress: !0
  })
  .then(res => {
    const totalPosts = res.headers.get('x-wp-total');
    if (totalPosts)
      return res
      .json()
      .then((data) => {
        data.totalPosts = totalPosts;
        return resolve(data);
      });
    return res.json();
  }))
}

export const post = (_, args) => {
  if (args.id) {
    return getWP(`posts/${args.id}`);
  }
  if (args.slug) {
    return getWP('posts', `slug=${args.slug}`)
      .then(posts => resolve(posts.length ? posts[0] : {}));
  }
}
export const posts = (_, {category}) => {
  let catId = null;
  if(category){
    const cats = Promise.await(getWP('categories',`slug=${category.toLowerCase()}`));
    catId = cats.length ? cats[0].id : null;
  }
  return getWP('posts', catId ? `categories=${catId}` : null);
};
export const categories = () => getWP(`categories`);
export const author = ({author}) => getWP(`users/${author}`);
export const getCategoryById = id => getWP(`categories/${id}`);
export const getPostsByAuthor = id => getWP('posts', `author=${id}`);
