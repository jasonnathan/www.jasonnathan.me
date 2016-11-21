import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import Posts from '/imports/api/collections';
import { SkillsData } from './defaultSkills';

export default () => {
  if(Posts.find({}).count() === 0){
    SkillsData.map((post) => {
      Posts.insert(post)
    })
  }
  if (Meteor.users.find().count() === 0 ) {

    let users = [
      {
        email: 'jjnathanjr@gmail.com',
        password: 'password',
        firstname: 'Jason',
        lastname: 'Nathan',
        roles: ['admin']
      },
    ];

    users.map((user) => {
      console.log(`Add user ${user.email} to the database.`)
      let userId = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {
          firstname: user.firstname,
          lastname: user.lastname,
          name: `${user.firstname} ${user.lastname}`
        },
        roles: user.roles
      });
      Meteor.users.update(userId, {$set: {'emails.0.verified': true}})
    })
  }
}
