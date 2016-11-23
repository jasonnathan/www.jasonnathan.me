const skurl = (path) => `/work/${path}`;
const skimg = (path) => `/brands/${path}`;

const featuredImage = null;
const daysPast = Math.round(Math.abs(new Date() - new Date("2016-10-24")) / 8.64e7);
const contentPast = Math.round(Math.abs(new Date() - new Date("2016-11-17")) / 8.64e7);
const totalSkills = sd => sd.length,
  completedSkills = sd => sd.map(s => s.featuredImage !== featuredImage ? s : null).filter(s => s),
  completedSkillsCount = cs => cs.length,
  completedSkillsArray = cs => cs.map(s => {return {title:s.title, to:s.to};}),
  overview = (sd) => {
    const cs = completedSkills(sd);
    const csString = () => cs.map(c => `<li><a href="${c.to}">${c.title}</a>`).join("</li>");
    return `<h2 style="text-align:center">WORK IN PROGRESS</h2>
    <br /> Development for this website <a target="_blank" href="https://github.com/jasonnathan/jasonnathan-react.com/commit/e563cce22f79f261e06cd155524603974bb4da6a">
      began ${daysPast} days ago</a>. The <a href="https://github.com/jasonnathan/jasonnathan-react.com/commit/db81b68dc10aa7f50b4dc73988a55dc14db605d7" target="_blank">
    first article was written ${contentPast} days ago</a>.
    <br />Content is being uploaded everyday, please be patient. Thus far, ${completedSkillsCount(cs)} out of ${totalSkills(sd)} Overviews, covering 4 Project write-ups on the Work page have been completed.
    <br /><ul>${csString()}</ul>`
  };

const _SkillsData = [
  {
    to: skurl('reactjs'),
    icon: skimg('reactjs.svg'),
    title: "ReactJS",
    category: "UI Frameworks",
    description: `I have only recently started to work with ReactJS and have come to really enjoy it. ES6 & JSX are wonderful to write in
      and React's Component level abstraction is refreshing. <br />
      More than that, server generated markup with all content preloaded is exactly what I've been looking for in a modern UI framework.
      You still get all the CSS/JS animations baked in on the client and your markup is not littered with bizzare attributes.
      This site is written with React and serves as an example: <br />
      If you cURLed this URL, you'd see the generated markup does not differ from what is in the browser. <br />
      Add a little data with <a href="/work/graphql">GraphQL</a>,
      a central state management tool like <a href="/work/redux">Redux</a>
      and you have all you need to build complex data-driven user experiences on top of any back-end you prefer.`,
    featuredImage: '/screenshots/jasonnathan-work-iphone5.png',
    projects: [
      {
        to: skurl('reactjs/docviser'),
        title: 'DocViser',
        featuredImage: '/screenshots/docviser.png',
        description: `DocViser is startup focused on creating a new mobile medical platform for doctors and patients. I joined the team as their primary
          technology consultant to help with their software architecture and resource aquisition. <br />
          They had a simple, straight-forward UI and React was the perfect toolkit for the job. I helped to build a
          quick prototype based on their initial design and had it tested on both Android and iOS devices as a proof of concept <br />
          They have since moved ahead and is currently actively developing their product. <br />
          DocViser's architecture is built with <a href="/work/mongodb">MongoDB</a> as their primary storage with their
          core servers hosted on <a href="/work/digitalocean">Digital Ocean</a>.`
      }
    ]
  }, {
    to: skurl('d3'),
    icon: skimg('d3.svg'),
    title: "D3",
    category: "UI Frameworks",
    featuredImage,
    description: null,
    projects: [
      {
        to: skurl('d3/heardable'),
        title: "Heardable",
        featuredImage: "",
        description: null
      }
    ]
  }, {
    to: skurl('knockout'),
    icon: skimg('knockout.svg'),
    title: "Knockout Projects",
    category: "UI Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('less'),
    icon: skimg('less.svg'),
    title: "LESS",
    category: "UI Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('javascript'),
    icon: skimg('JS.svg'),
    title: "JavaScript Projects",
    category: "Languages",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('php'),
    icon: skimg('php.svg'),
    title: "PHP Projects",
    category: "Languages",
    featuredImage: '/screenshots/php.jpg',
    description: `I started Web Programming with Perl in the late 90s and then moved to PHP which was already getting better support and growing into into a
      larger eco-system. <br />In the early days, PHP didn't have a great reputation and many servers were written in ASP/Perl instead.
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
      Quoting one of the great Kohana devs</a>, I leave you with this: <blockquote>Choosing a framework without looking at the code is like buying a new sofa without sitting on it.</blockquote>`,
    projects: [
      {
        to: skurl('php/ppsg'),
        title: "Private Property",
        featuredImage: "/screenshots/ppsg-craigslist.png",
        description: `Private Property was a combination of individual scripts built in the mid-2000s. There were data crawlers that automatically gathered listings from all over the internet. <br />There
          were data formatters that automatically searched for property images on Google (allowed at the time) and generated a unique ad header, based on the information in the listing.<br />
          There were the blasters that blasted out theses re-formatted listings to over 10 free property classifieds - all linking back to a single website & blog.
          <br />This wasn't just an experiment. It yielded in an average of 30 emails/SMSes/calls a day from the resulting traffic. It was a near zero-cost, yet priceless real-estate marketing tool.
          <br />The ownership of the domain has been transferred but it still enjoys traffic from all my previous efforts.
          Some auto-blasted listings still exist today.`
      }, {
        to: skurl('php/realtasia'),
        title: "RealtAsia",
        featuredImage: "/screenshots/realtasia-feed-2.png",
        description: `RealtAsia was originally prototyped in 2010 with an early version of BuddyPress (a WordPress social add-on) but it proved too difficult to customise and the final application was simply too resource hungry to be ready for primetime<br />
          The re-write was created as multiple smaller applications primarily consisting of custom-made oAuth2 based API & Application servers.
          It is supported with a custom queue module for processing notifications & emails, a <i>"ticker"</i> module for processing newsfeeds and a websocket server for live updates<br />
          With the exception of the websocket server, everything else is powered by PHP, specifically, Kohana.<br />
          RealtAsia's API server is built with scalability. It has an extremely small memory/CPU footprint. It can process 10k authenticated requests at a concurrency of 100 in a few seconds on the lowest hardware specs (1GHz single Core, 512MB RAM).
          <br />Behind the scenes, <a href="/work/mongodb">MongoDB</a> powers the social network, property listings and analytics.<br />
          Unfortunately, RealtAsia was never brought to market and currently, the entire application is scaled down into a single server - serving little or no traffic and is hidden away from search engines.`
      }, {
        to: skurl('php/Heardable'),
        title: "Heardable",
        featuredImage: "/screenshots/heardable-summary-desktop.png",
        description: `Heardable's legacy application was very much a working prototype however,
          it was not scalable and increasing the number of daily <i>"Brand Scans"</i> would send App and DB servers spiking out of control.<br />
          The core business logic was sound and desperately needed to be abstracted out. The first step was to refactor how modules were instantiated and the cleanup began with top-down approach, bringing down
          concurrent database connections to under 50 from a whopping 2k+ initially.<br /> Then began the slow & tedious task of abstracting, testing and decoupling core business modules.<br /> When the core API was finally working predictably, the next step was to move out the <a href="/work/mysql">MySQL</a> servers on <a href="/work/aws">Amazon RDS</a>
          to MariaDB servers hosted on <a href="/work/digitalocean">Digital Ocean</a>.<br />The PHP API servers were also moved out to Digital Ocean, cutting latency and saving over 2/3 thirds of the monthly infrastructure cost even after upscaling daily brands scans by 10X`
      }
    ]
  }, {
    to: skurl('nodejs'),
    icon: skimg('nodejs-light.svg'),
    title: "NodeJS",
    category: "Server Frameworks",
    description: null,
    featuredImage,
    projects: []
  }, {
    to: skurl('codeigniter'),
    icon: skimg('codeigniter.svg'),
    title: "Codeigniter PHP",
    category: "Server Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('kohana'),
    icon: skimg('kohana.svg'),
    title: "Kohana PHP",
    category: "Server Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('meteor'),
    icon: skimg('meteor-light.svg'),
    title: "Meteor Projects",
    category: "FullStack Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('sailsjs'),
    icon: skimg('sailsjs-light.svg'),
    title: "SailsJS Projects",
    category: "FullStack Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('cordova'),
    icon: skimg('cordova.svg'),
    title: "Cordova Projects",
    category: "FullStack Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('aws'),
    icon: skimg('aws.svg'),
    title: "AWS",
    category: "IAAS",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('digitalocean'),
    icon: skimg('digitalocean.svg'),
    title: "Digital Ocean",
    category: "IAAS",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('graphql'),
    icon: skimg('graphql.svg'),
    title: "GraphQL",
    category: "Data Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('socketio'),
    icon: skimg('socketio.svg'),
    title: "Socket IO",
    category: "Data Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('apollostack'),
    icon: skimg('apollo-word.svg'),
    title: "Apollo Projects",
    category: "Data Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('redux'),
    icon: skimg('redux-light.svg'),
    title: "Redux Projects",
    category: "Data Frameworks",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('mocha'),
    icon: skimg('mocha.svg'),
    title: "Mocha Testing",
    category: "Testing & Integration",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('jenkins'),
    icon: skimg('jenkins.svg'),
    title: "Jenkins CI",
    category: "Testing & Integration",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('strider'),
    icon: skimg('strider-cd.svg'),
    title: "Strider CD Projects",
    category: "Testing & Integration",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('git'),
    icon: skimg('git.svg'),
    title: "GIT",
    category: "Version Control",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('mercurial'),
    icon: skimg('mercurial.svg'),
    title: "Mercurial",
    category: "Version Control",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('mongodb'),
    icon: skimg('mongodb.svg'),
    title: "MongoDB",
    category: "Databases",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('mysql'),
    icon: skimg('mysql-word.svg'),
    title: "MySQL",
    category: "Databases",
    featuredImage,
    description: null,
    projects: []
  }, {
    to: skurl('neo4j'),
    icon: skimg('neo4j-word.svg'),
    title: "Neo4j",
    category: "Databases",
    featuredImage,
    description: null,
    projects: []
  }
];

const computedOverview = overview(_SkillsData);

const useDefaultOrClean = (d) => {
  d = d || computedOverview;
  return cleanIfString(d);
};

const cleanIfString = (d) => d ? d.replace(/(\r\n|\n|\r)/gm,'').replace(/ +/g, ' ').trim() : d;

const SkillsData = _SkillsData.map(s => {
  s.description = cleanIfString(s.description);
  s.projects = s.projects.map(p => {
    if(p){
      p.description = cleanIfString(p.description);
      return p;
    }
  }).filter(p=>p);
  s.status = "published";
  s.type = "skill";
  return s;
});

export {skurl, SkillsData}
