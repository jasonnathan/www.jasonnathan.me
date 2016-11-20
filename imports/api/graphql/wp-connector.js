/*globals fetch*/
import 'isomorphic-fetch';
import querystring from 'querystring';

// Posts.remove({});

// const url = 'https://public-api.wordpress.com/wp/v2/sites/japanatrois.wordpress.com';
const url = 'https://public-api.wordpress.com/wp/v2/sites/jasonnathan.wordpress.com';
const authUrl = 'https://public-api.wordpress.com/oauth2/token';
let _headers = {
  // Accept: 'application/json',
  // 'Content-Type': 'application/json',
  Authorization: null
};

const authWP = () => {
  if (_headers.Authorization)
    return Promise.resolve(_headers);

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
  .then(({access_token}) => ({Authorization:`Bearer ${access_token}`}))
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
  // .then(data => {
  //   console.log(data)
  //   return Promise.resolve(data);
  // })
}

export const getPost = args => {
  const then = (posts) => Promise.resolve(posts.length
    ? posts[0]
    : {});

  console.log(args)
  if (args.id) {
    return getWP(`posts/${args.id}`).then(then);
  }
  if (args.slug) {
    return getWP('posts', `slug=${args.slug}`).then(then);
  }
}
export const getAuthor = id => getWP(`users/${id}`);
export const getCategoryById = id => getWP(`categories/${id}`,)
export const getPostsByAuthor = id => getWP('posts', `author=${id}`);
export const getCategories = () => getWP(`categories`);
export const getPosts = () => getWP('posts');
