/*globals describe, it*/
import chai from 'chai';
import chaiAsPromised from "chai-as-promised";
import WPAuth from './Wordpress';

chai.use(chaiAsPromised);

const expect = chai.expect;

const {CLIENT_ID, CLIENT_SECRET, WP_USERNAME, WP_PASSWD, WP_URL} = process.env;

let auth,
  props = {
    username: WP_USERNAME,
    password: WP_PASSWD,
    client_secret: CLIENT_SECRET,
    client_id: CLIENT_ID
  };

describe("Wordpress", function() {
  describe(".request()", function() {
    it("should return an a request object with a json property", function() {
      auth = new WPAuth({});
      expect(auth.request({
        ...props,
        authUrl: auth.authUrl
      })).to.eventually.have.property('json');
    });
  });
  describe(".json()", function() {
    it("should throw an error if there was a problem with the request", function() {
      auth = new WPAuth({});
      const json = auth.request({
        ...props,
        authUrl: auth.authUrl,
        client_id: "wrong"
      }).then(auth.json);

      expect(json).to.eventually.be.rejectedWith(Error, 'Unknown client_id.');
    });
  });
  describe(".storeTokenAndResolve()", function() {
    it("should return a promise that resolves to a string token", function() {
      auth = new WPAuth({});
      const token = auth.request({
        ...props,
        authUrl: auth.authUrl
      })
      .then(auth.json)
      .then(auth.storeTokenAndResolve);

      expect(token).to.eventually.be.ok;
    });

    it("should cache the token within the parent instance", function() {
      auth = new WPAuth({});
      return auth.request({
        ...props,
        authUrl: auth.authUrl,
        grant_type: "password"
      })
      .then(auth.json)
      .then(auth.storeTokenAndResolve.bind(auth))
      .then(() => {
        expect(auth.token).to.be.ok
      });
    });
  })
  describe(".access_token()", function() {
    it("should return an access_token when called", function() {
      auth = new WPAuth(props);
      expect(auth.access_token()).to.eventually.be.ok;
    });
  })
});
