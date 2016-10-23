/* global document*/
import React, {PropTypes} from 'react';
import 'react-typist/dist/Typist.css';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Flex, Item } from 'react-flex';

const MediaElement = ({children, file, dim=40, flex={}}) => (
  <Item {...flex} className="valign-center">
    <Avatar className="Avatar" src={file} size={dim} />
    {children}
  </Item>
)

MediaElement.propTypes = {
  file: PropTypes.string,
  flex: PropTypes.object,
  dim: PropTypes.number,
  children: React.PropTypes.oneOfType([ PropTypes.string, PropTypes.object])
}

const App = () => (
  <MuiThemeProvider>
    <Flex row alignItems="center">
      <MediaElement
        file="https://gravatar.com/avatar/52a2bd197cce5880c2053442b2a6a0e5?size=100"
        dim={80}
      >
        <h1>
          Jason J. Nathan
          <small className="block">Software Engineer based in Singapore</small>
        </h1>
      </MediaElement>
    </Flex>
    {/*
    <MediaElement file="/git.svg">
      I use Git for version control, manage code on Github & Bitbucket.
    </MediaElement>
    <MediaElement file="/stackoverflow.svg">
      I try to answer questions on StackOverflow.
    </MediaElement>
    <MediaElement file="/TDD.png">
      I use a Test Driven Development (TDD) approach for development.
    </MediaElement>
    <p>I write in half a dozen programming languages & scripts.</p>
    <p>I have created Windows Apps, Android Apps and Web Apps.</p>
    <p>I love Databases & Analytics.</p>
    <p>I absolutely enjoy creating User Interfaces & Experiences.</p>
    */}
  </MuiThemeProvider>
);

export default App;
