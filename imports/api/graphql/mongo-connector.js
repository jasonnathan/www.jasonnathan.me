import {Meteor} from 'meteor/meteor';
import Posts from '../collections';

export function skills(_, args, context) {
  let {userId} = context
      ? context
      : {
        userId: null
      },
    query = {
      type: 'skill'
    };
  if (!userId) {
    query.status = "published";
  }
  return Posts.find(query).fetch()
}
export function skill(_, args) {
  const {to} = args;
  return Posts.findOne({to: to});
}

export function insertSkill(_, args, context = {}) {
  let {userId} = context;
  if (userId) {
    args.type = "skill";
    return {_id: Posts.insert(args)};
  }
  throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
}
export function deleteSkill(_, args, context = {}) {
  let {userId} = context;
  if (userId) {
    return {success: Posts.remove(args)};
  }
  throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
}
export function updateSkill(_, args, context = {}) {
  let {userId} = context;
  if (!userId)
    throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");

  const {_id} = args;
  const fields = ['title', 'to', 'description', 'icon', 'featuredImage'];
  let params = {};
  fields.forEach(key => !!args[key] && (params[key] = args[key]));
  Posts.upsert(_id, {$set: params})
  return Posts.findOne({_id});
}

export function updateProject(_, args, context = {}) {
  let {userId} = context;
  if (!userId)
    throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");

  const fields = ['title', 'to', 'description', 'icon', 'featuredImage'];
  let {index, _id} = args;
  _id = _id.split("_")[0];
  let params = {}, $set = {}, p = `projects.${index}`, $query = {_id};
  fields.forEach(key => !!args[key] && (params[key] = args[key]));
  $set[p] = params
  $query[p] = {$exists:true}
  console.log({_id}, {$set})
  Posts.update({_id}, {$set});
  let post = Posts.findOne($query, {'projects.$':1}).projects[0]
  return {_id, ...post}
}
