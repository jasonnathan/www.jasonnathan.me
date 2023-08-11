import R from "ramda";

const { findIndex } = R


export const getCurrentIndex = ({ projects }, { pathname }) =>
  findIndex( p => p.to === pathname)(projects) + 1 || 0;

export const daysPast = Math.round(Math.abs(new Date() - new Date("2016-10-24")) / 8.64e7);

export const contentPast = Math.round(Math.abs(new Date() - new Date("2016-11-17")) / 8.64e7);

export const getDefaultDescription = () => (
  `<h2 style="text-align:center">WORK IN PROGRESS</h2><br />Development for this website <a target="_blank" href="https://github.com/jasonnathan/jasonnathan-react.com/commit/e563cce22f79f261e06cd155524603974bb4da6a"> began ${daysPast} days ago</a>. The <a href="https://github.com/jasonnathan/jasonnathan-react.com/commit/db81b68dc10aa7f50b4dc73988a55dc14db605d7" target="_blank"> first article was written ${contentPast} days ago</a>.<br />Content is being uploaded everyday, please be patient.<br />In the meantime, look out for items that are marked &check;`
);
