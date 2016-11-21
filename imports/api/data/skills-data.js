const skurl = (path) => `/work/${path}`;
const skimg = (path) => `/brands/${path}`;

const SkillsData = [
  {to: skurl('reactjs'), src: skimg('reactjs.svg'), title: "ReactJS", count:1, category:"UI Frameworks", overview:`
    I have only recently started to work with ReactJS and have come to really enjoy it. ES6 & JSX are wonderful to write in
    and React's Component level abstraction is refreshing. <br />
    More than that, server generated markup with all content preloaded is exactly what I've been looking for in a modern UI framework.
    You still get all the CSS/JS animations baked in on the client and your markup is not littered with bizzare attributes.
    This site is written with React and serves as an example: <br />
    If you cURLed this URL, you'd see the generated markup does not differ from what is in the browser. <br />
    Add a little data with <a href="/work/graphql">GraphQL</a>,
    a central state management tool like <a href="/work/redux">Redux</a>
    and you have all you need to build complex data-driven user experiences on top of any back-end you prefer.`,
  overviewImg: '/screenshots/jasonnathan-work-iphone5.png',
  projects:[
    {name: 'DocViser', path:skurl('reactjs/docviser'), overviewImg:'/screenshots/docviser.png',overview:`
      DocViser is startup focused on creating a new mobile medical platform for doctors and patients. I joined the team as their primary
      technology consultant to help with their software architecture and resource aquisition. <br />
      They had a simple, straight-forward UI and React was the perfect toolkit for the job. I helped to build a
      quick prototype based on their initial design and had it tested on both Android and iOS devices as a proof of concept <br />
      They have since moved ahead and is currently actively developing their product. <br />
      DocViser's architecture is built with <a href="/work/mongodb">MongoDB</a> as their primary storage with their
      core servers hosted on <a href="/work/digitalocean">Digital Ocean</a>.
    `}
  ]},
  {to: skurl('d3'), src: skimg('d3.svg'), title: "D3", count:6, category: "UI Frameworks", overview:``, projects:[
    {name: "Heardable", path:skurl('d3/heardable'), overviewImg:"", overview:""}
  ]},
  {to: skurl('knockout'), src: skimg('knockout.svg'), title: "Knockout Projects", count:6, category: "UI Frameworks", overview:"" },
  // {to: skurl('handlebars'), src: skimg('handlebars.svg'), title: "Handlebars Projects", count:6, category: "UI Frameworks" },
  // {to: skurl('jquery'), src: skimg('jquery.svg'), title: "jQuery Projects", count:6, category: "UI Frameworks" },
  {to: skurl('less'), src: skimg('less.svg'), title: "LESS", count:6, category: "UI Frameworks", overview:"",projects:[] },
  {to: skurl('javascript'), src: skimg('JS.svg'), title: "JavaScript Projects", count:3, category:"Languages", overview:"",projects:[] },
  {to: skurl('php'), src: skimg('php.svg'), title: "PHP Projects", count:3, category:"Languages", overview:`
    I started Web Programming with Perl in the late 90s and then moved to PHP which was already getting better support and growing into into a
    larger eco-system. <br />In the early days, PHP didn't have a great reputation and most servers were written in ASP.
    My first PHP programs were simple scripts run by CRONs. <br />My first PHP web project was privateproperty.com.sg, initially
    written in plain PHP and then rebuilt with <a href="/work/codeigniter">Codeigniter</a>
    and Wordpress (for the property blog). <br />Eventually, I created RealtAsia with <a href="/work/kohana">Kohana</a> which was a
    modern version of Codeigniter at the time. <br />Soon after, Symfony came along but it was a little verbose for my taste. Laravel, however,
    seemed to be a summation of them all. If you looked at its code, you'd see bits & pieces of these other frameworks
    everywhere it made sense. <br />
    When it comes to PHP, I prefer curating individual modules from packagist and installing the well-written ones with Composer, creating
    a custom <i>"framework"</i> based on the needs of each project.<br />Why would you stick to any one framework anyway, there has never been
    a one size fits all. I've done some great things with PHP and it will always be part of my DNA.
    <a href="https://disqus.com/home/discussion/kohana/what_is_kohana_kodoc/best/" target="_blank" rel="nofollow">
      Quoting one of the great Kohana devs</a>, I leave you with this: <blockquote>Choosing a framework without looking at the code is like buying a new sofa without sitting on it.</blockquote>
  `,projects:[
      {name: "Private Property", path:skurl('php/ppsg'), overviewImg:"/screenshots/ppsg-craigslist.png", overview:`
        Private Property was a combination of individual scripts built in the mid-2000s. There were data crawlers that automatically gathered listings from all over the internet. <br />There
        were data formatters that automatically searched for property images on Google (allowed at the time) and generated a unique ad header, based on the information in the listing.<br />
        There were the blasters that blasted out theses re-formatted listings to over 10 free property classifieds - all linking back to a single website & blog.
        <br />This wasn't just an experiment. It yielded in an average of 30 emails/SMSes/calls a day from the resulting traffic. It was a near zero-cost, yet priceless real-estate marketing tool.
        <br />The ownership of the domain has been transferred but it still enjoys traffic from all my previous efforts.
        Some auto-blasted listings still exist today.
      `},
      {name: "RealtAsia", path:skurl('php/realtasia'), overviewImg:"/screenshots/realtasia-feed-2.png", overview:`RealtAsia was originally prototyped in 2010
      with an early version of BuddyPress (a WordPress social add-on) but it proved too difficult to customise and the final application was simply too resource hungry to be ready for primetime<br />
      The re-write was created as multiple smaller applications primarily consisting of custom-made oAuth2 based API & Application servers.
      It is supported with a custom queue module for processing notifications & emails, a <i>"ticker"</i> module for processing newsfeeds and a websocket server for live updates<br />
      With the exception of the websocket server, everything else is powered by PHP, specifically, Kohana.<br />
      RealtAsia's API server is built with scalability. It has an extremely small memory/CPU footprint. It can process 10k authenticated requests at a concurrency of 100 in a few seconds on the lowest hardware specs (1GHz single Core, 512MB RAM).
      <br />Behind the scenes, <a href="/work/mongodb">MongoDB</a> powers the social network, property listings and analytics.<br />
      Unfortunately, RealtAsia was never brought to market and currently, the entire application is scaled down into a single server - serving little or no traffic and is hidden away from search engines.`},
      {name: "Heardable", path:skurl('php/Heardable'), overviewImg:"/screenshots/heardable-summary-desktop.png", overview:`Heardable's legacy application was very much a working prototype with a huge codebase. However,
      it was not scalable and increasing the number of daily <i>"Brand Scans"</i> would send App and DB servers spiking out of control.<br />
      The core business logic was sound and desperately needed to be abstracted out. The first step was refactor how modules were instantiated and the cleanup began with top-down approach, bringing down
      concurrent database connections to under 50 from a whopping 2k+ initially.<br /> Then began the slow & tedious task of abstracting, testing and decoupling core business modules.<br /> When the core API was finally working predictably, the next step was to move out the <a href="/work/mysql">MySQL</a> servers on <a href="/work/aws">Amazon RDS</a>
      to MariaDB servers hosted on <a href="/work/digitalocean">Digital Ocean</a>.<br />The PHP API servers were also moved out to Digital Ocean, cutting latency and saving over 2/3 thirds of the monthly infrastructure costs even after upscaling daiy brands scans by 10X`},
    ] },
  // {to: skurl('perl'), src: skimg('perl-logo.svg'), title: "Perl Projects", count:3, category:"Languages" },
  {to: skurl('nodejs'), src: skimg('nodejs-light.svg'), title: "NodeJS", count:6, category: "Server Frameworks", overview:"",projects:[] },
  {to: skurl('codeigniter'), src: skimg('codeigniter.svg'), title: "Codeigniter PHP", count:6, category: "Server Frameworks", overview:"",projects:[] },
  {to: skurl('kohana'), src: skimg('kohana.svg'), title: "Kohana PHP", count:6, category: "Server Frameworks", overview:"",projects:[] },
  {to: skurl('meteor'), src: skimg('meteor-light.svg'), title: "Meteor Projects", count:5, category: "FullStack Frameworks", overview:"",projects:[] },
  {to: skurl('sailsjs'), src: skimg('sailsjs-light.svg'), title: "SailsJS Projects", count:5, category: "FullStack Frameworks", overview:"",projects:[] },
  {to: skurl('cordova'), src: skimg('cordova.svg'), title: "Cordova Projects", count:5, category: "FullStack Frameworks", overview:"",projects:[] },
  {to: skurl('aws'), src: skimg('aws.svg'), title: "AWS", count:1, category: "IAAS", overview:"",projects:[] },
  {to: skurl('digitalocean'), src: skimg('digitalocean.svg'), title: "Digital Ocean", count:1, category: "IAAS", overview:"",projects:[] },
  {to: skurl('graphql'), src: skimg('graphql.svg'), title: "GraphQL", count:6, category: "Data Frameworks", overview:"",projects:[] },
  {to: skurl('socketio'), src: skimg('socketio.svg'), title: "Socket IO", count:6, category: "Data Frameworks", overview:"" },
  {to: skurl('apollostack'), src: skimg('apollo-word.svg'), title: "Apollo Projects", count:6, category: "Data Frameworks", overview:"" },
  {to: skurl('redux'), src: skimg('redux-light.svg'), title: "Redux Projects", count:1, category: "Data Frameworks", overview:"" },
  {to: skurl('mocha'), src: skimg('mocha.svg'), title: "Mocha Testing", count:6, category: "Testing & Integration", overview:"" },
  {to: skurl('jenkins'), src: skimg('jenkins.svg'), title: "Jenkins CI", count:6, category: "Testing & Integration", overview:"" },
  {to: skurl('strider'), src: skimg('strider-cd.svg'), title: "Strider CD Projects", count:6, category: "Testing & Integration", overview:"" },
  {to: skurl('git'), src: skimg('git.svg'), title: "GIT", count:6, category: "Version Control", overview:"" },
  {to: skurl('mercurial'), src: skimg('mercurial.svg'), title: "Mercurial", count:6, category: "Version Control", overview:"" },
  {to: skurl('mongodb'), src: skimg('mongodb.svg'), title: "MongoDB", count:6, category: "Databases", overview:"" },
  {to: skurl('mysql'), src: skimg('mysql-word.svg'), title: "MySQL", count:6, category: "Databases", overview:"" },
  {to: skurl('neo4j'), src: skimg('neo4j-word.svg'), title: "Neo4j", count:6, category: "Databases", overview:"" },
];


export {skurl, SkillsData}
