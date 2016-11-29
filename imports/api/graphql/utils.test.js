/*globals describe, it*/
import { Meteor } from 'meteor/meteor';
import chai from 'chai';
import { sanitizeStringFields, sanitizeByProperty } from './utils';

const expect = chai.expect;

describe("sanitizeByProperty", function(){
  it("should throw if not given an Array as first argument", function(){
    expect(() => sanitizeByProperty("something", {non:"empty"}))
    .to.throw(Error, "propertyArray needs an array of keys, non-array or empty array given");
  });
  it("should throw if a given an empty Array as first argument", function(){
    expect(() => sanitizeByProperty([], {non:"empty"}))
    .to.throw(Error, "propertyArray needs an array of keys, non-array or empty array given");
  })
  it("should throw if not given an Object as second argument", function(){
    expect(() => sanitizeByProperty(["somekey"], []))
    .to.throw(Error, "sourceObj needs a non-empty object. Empty object given");
  });
  it("should throw if a given an empty Object as second argument", function(){
    expect(() => sanitizeByProperty(["somekey"], {}))
    .to.throw(Error, "sourceObj needs a non-empty object. Empty object given");
  });
});
