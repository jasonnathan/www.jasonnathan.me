/*globals fetch*/
import 'isomorphic-fetch';
import querystring from 'querystring';

const url = 'https://public-api.wordpress.com/wp/v2/sites/jasonnathan.wordpress.com';
const authUrl = 'https://public-api.wordpress.com/oauth2/token';
let _headers = {
  // Accept: 'application/json',
  // 'Content-Type': 'application/json',
  Authorization: null
};

const authWP = () => {
  const then = (h) => Promise.resolve(h);
  if (_headers.Authorization) return then(_headers);

  const {CLIENT_ID, CLIENT_SECRET, WP_USERNAME, WP_PASSWD} = process.env;
  const form = {
    client_secret: CLIENT_SECRET, client_id: +CLIENT_ID,
    grant_type: 'password', username: WP_USERNAME, password: WP_PASSWD
  };
  return fetch(authUrl, {
    headers: {"Content-Type": 'application/x-www-form-urlencoded'},
    method: 'POST',
    compress: true,
    body: querystring.stringify(form)
  })
  .then(res => res.json())
  .then(({access_token}) => then({Authorization:`Bearer ${access_token}`}))
}
const getWP = (endpoint, query) => {
  let ep = `${url}/${endpoint}`;
  ep += query ? `?${query}` : '';
  return authWP()
  .then(headers => fetch(ep, {
    headers,
    compress: !0
  })
  .then(res => {
    const totalPosts = res.headers.get('x-wp-total');
    if (totalPosts)
      return res.json().then((data) => {
        data.totalPosts = totalPosts;
        return Promise.resolve(data);
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
      .then(posts => Promise.resolve(posts.length ? posts[0] : {}));
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