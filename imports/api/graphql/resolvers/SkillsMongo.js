import {Meteor} from 'meteor/meteor';
import Posts from '../../collections';
import {sanitizeStringFields, sanitizeByProperty} from '../utils';

/**
 * Checks if there is a logged in user and that he is an admin
 * @param  {String}  userId The id of the logged in user
 * @return {Boolean}        true if admin, false ifnot
 */
const isAdmin = ({userId}) => {
  // admins have a field role with `admin` as a key
  return !!(userId && Meteor.users.findOne({_id: userId, roles: 'admin'}));
}

/**
 * Retrieves an array of skills
 *
 * @param  {Object} _            Provided by apollo, not used
 * @param  {Object} args         Variables fed through graphql
 * @param  {Object} [context={}] This is where apollo provides user info
 * @return {Array}               A list of skills
 */
export function skills(_, args, context = {}) {
  //default query
  let query = { type: 'skill'};

  // admins get all statuses
  if (isAdmin(context)) { query.status = "published";}

  // return found objects
  return Posts.find(query).fetch();
}

/**
 * Retrieves a single skill by path (to)
 *
 * @param  {Object} _            Provided by apollo, not used
 * @param  {Object} args         Variables fed through graphql
 * @return {Object}              The skill if found or null
 * @todo What happens when this is called by a non-admin and status is draft?
 */
export function skill(_, args) {
  // sanitize, why does it sound like sanity?
  const {to} = sanitizeStringFields(args);

  // return found document
  return Posts.findOne({to: to});
}

/**
 * Inserts a new skill into the DB
 *
 * @param  {Object} _            Provided by apollo, not used
 * @param  {Object} args         Variables fed through graphql
 * @param  {Object} [context={}] This is where apollo provides user info
 * @return {Object}              An object with the inserted _id
 */
export function insertSkill(_, args, context = {}) {
  // no admin, no continue :)
  if (!isAdmin(context)) {
    throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
  }
  // adding a default type as skill in this case
  args.type = "skill";

  //insert and return after sanitizing
  return {_id: Posts.insert(sanitizeStringFields(args))};
}

/**
 * Deletes a skill by id
 *
 * @param  {Object} _            Provided by apollo, not used
 * @param  {Object} args         Variables fed through graphql
 * @param  {Object} [context={}] This is where apollo provides user info
 * @return {Object}              An object with the inserted _id
 */
export function deleteSkill(_, args, context = {}) {
  // don't continue if not admin
  if (!isAdmin(context))
    throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");

  // remove, but after sanitizing input
  return {success: Posts.remove(sanitizeStringFields(args))};
}

/**
 * updates a skill by id
 *
 * @param  {Object} _            Provided by apollo, not used
 * @param  {Object} args         Variables fed through graphql
 * @param  {Object} [context={}] This is where apollo provides user info
 * @return {Object}              An newly updated skill
 */
export function updateSkill(_, args, context = {}) {
  // again check if admin
  if (!isAdmin(context))
    throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");

  // sanitize input
  args = sanitizeStringFields(args);

  const {_id} = args, // extract the _id
    // only insert known fields
    fields = ['title', 'to', 'description', 'icon', 'featuredImage'];

  // only add known fields
  let params = sanitizeByProperty(fields, args);

  // perform update
  Posts.update(_id, {$set: params});

  // returned updated object
  return Posts.findOne({_id});
}

/**
 * A special usecase, fundamentally similar to above but for projects listed in
 * a skill
 *
 * @param  {Object} _            Provided by apollo, not used
 * @param  {Object} args         Variables fed through graphql
 * @param  {Object} [context={}] This is where apollo provides user info
 * @return {Object}              An newly updated skill
 */
export function updateProject(_, args, context = {}) {
  // check for admin, as usual
  if (!isAdmin(context))
    throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");

  // sanitize all fields
  args = sanitizeStringFields(args);

  // a set of known fields to insert
  const fields = ['title', 'to', 'description', 'icon', 'featuredImage'];
  // extract index (but it's provided by the ID)
  let {index} = args,
    // extract _id
    _id = args._id.split("_")[0],
    // empty placeholder to construct params to insert
    params = sanitizeByProperty(fields, args),
    // the final set object
    $set = {},
    // loop through known fields and only add ones that are known
    p = `projects.${index}`,
    // default query
    $query = {_id};

  // set the update for the project in question
  $set[p] = params

  // this is how to select the project to update
  $query[p] = {
    $exists: true
  }

  // perform the update
  Posts.update({
    _id
  }, {$set});

  //return the project itself with the parent skill's _id as the _id
  return {
    _id,
    ...Posts.findOne($query, {'projects.$': 1}).projects[0]
  }
}
