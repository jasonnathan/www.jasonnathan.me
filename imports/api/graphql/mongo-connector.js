import {Meteor} from 'meteor/meteor';
import Posts from '../collections';

export function skills(_, args, context){
  let {userId} = context ? context : {
      userId: null
  }, query = {type:'skill'};
  if(!userId){
    query.status = "published";
  }
  return Posts.find(query).fetch();
}
export function skill(_, args, context){
  const {to} = args;
  return Posts.findOne({to: to});
}
export function me(_, args, context){
  let {userId} = context ? context : {
      userId: null
    };
  if (userId) {
    return Meteor.users.findOne(userId);
  }
}

export function updateProfile(root, args, context){
  let {userId} = context ? context : {
        userId: null
      },
    user = Meteor.users.findOne(userId) || {},
    profile = Object.assign({}, {
      ...user.profile,
      ...args
    });
  Meteor.users.update(user._id, {
    $set: {
      profile: profile
    }
  });
  return {success: true};
}
export function insertSkill(root, args, context) {
  let {userId} = context ? context : {
      userId: null
    };
  if (userId) {
    args.type="skill";
    return {_id: Posts.insert(args)};
  }
  throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
}
export function deleteSkill(root, args, context) {
  let {userId} = context ? context : {
      userId: null
    };
  if (userId) {
    return {success: Posts.remove(args)};
  }
  throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
}
export function updateSkill(root, args, context) {
  let {userId} = context ? context : {
      userId: null
    };
  if (userId) {
    let _id = args._id;
    delete args._id;
    args.type="skill";
    return {
      success: Posts.upsert(_id, {$set: args})
    };
  }
  throw new Meteor.Error("permission-denied", "Insufficient rights for this action.");
}
