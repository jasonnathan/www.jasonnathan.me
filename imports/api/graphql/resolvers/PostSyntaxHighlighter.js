import hljs from 'highlight.js';
import cheerio from 'cheerio';
import entities from "entities";

export const parse = (content) => {
  return decodeHTML => parser => parser(decodeHTML(content)).value;
}

export const highlight = (content) => {
  const $ = cheerio.load(content);
  $('pre')
    .addClass('scroll-x')
    .find('code')
    .each(function(){
      const el = $(this);
      el.html( parse( el.html() )( entities.decodeHTML )( hljs.highlightAuto ) );
    });
  return $.html();
}
