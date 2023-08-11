import shortcode from 'shortcode-parser';

shortcode.add('githubgist', (string, opts) => {
  //return console.log("githubgist", string, opts, ctx)
  if(!opts.id){
    throw new Error("A gist shortcode must have an ID to render");
  }
  return string;
});


export default shortcode;
