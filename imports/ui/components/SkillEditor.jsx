import {
  ContentState,
  Editor,
  EditorState
} from 'draft-js';
import React, {PureComponent} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class SkillEditor extends PureComponent {
  constructor(props) {
    super(props);
    const {
      _id,
      to,
      description="Please enter text",
      title="New Title",
      featuredImage,
      setEditingState,
      refreshSkill
    } = props;

    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(description, "<br />")),
      _id, to, title, featuredImage, setEditingState, refreshSkill
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
  }
  componentWillReceiveProps({description, _id, to, title, featuredImage, setEditingState, refreshSkill}){
    if(description){
      const content = ContentState.createFromText(description, "<br />");
      this.setState({
        editorState:EditorState.createWithContent(content),
        _id, to, title, featuredImage, setEditingState, refreshSkill
      })
    }
  }

  cancelEdit(){
    this.state.setEditingState(false)
  }

  logState(){
    const content = this.state.editorState.getCurrentContent();
    const {updateSkill, updateProject, __typename}  = this.props;
    const submit = __typename === "Skill" ? updateSkill : updateProject;
    const keys = ['_id', 'to', 'title', 'featuredImage'];
    let _vars = {description: content.getPlainText("<br />")};

    keys.map(k => _vars[k] = this.state[k]);
    submit(_vars)
    .then(() => {
      this.cancelEdit();
      if(__typename === "Project"){
        this.state.refreshSkill();
      }
    })
    .catch(e => console.error(e));

  }
  handleInput(e, k){
    const _ = {}
    _[k] = e.target.value.trim();
    this.setState(_)
  }
  render() {
    const {editorState, title, featuredImage, to} = this.state;
    return (
      <div style={styles.root}>
        <div className="inputContainer">
          <input
            type="text"
            value={title}
            onChange={(e) => this.handleInput(e, "title")}
          />
        </div>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Enter some text..."
            ref="editor"
          />
        </div>
        <div className="inputContainer" style={{display:"flex"}}>
          <input
            type="text"
            className="url"
            value={to}
            onChange={(e) => this.handleInput(e, "url")}
          />
          <input
            type="text"
            className="url"
            value={featuredImage}
            onChange={(e) => this.handleInput(e, "featuredImage")}
          />
        </div>
        <div className="buttons">
          <button onClick={(e) => this.logState(e)}>Save</button>
        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    padding: "1rem",
    maxWidth: "800px",
    textAlign:"center",
    margin:"auto"
  },
  editor: {
    border: '1px solid rgba(255,255,255,.1)',
    textAlign:"left",
    cursor: 'text',
    padding: "1rem",
    fontSize:"1.2rem",
    backgroundColor:"rgba(0,0,0,.5)"
  }
};

const updateSkill = gql`
  mutation updateSkill(
    $_id: ID,
    $title: String,
    $to: String,
    $featuredImage: String,
    $description: String
  ) {
    updateSkill(
      _id: $_id,
      title: $title,
      to: $to,
      featuredImage: $featuredImage,
      description: $description,
    ) {
      _id
      description
      title
      to
      featuredImage
      projects {
        description
        title
        to
        featuredImage
      }
    }
  }
`;

const updateProject = gql`
  mutation updateProject(
    $_id: ID,
    $title: String,
    $to: ID,
    $featuredImage: String,
    $description: String,
    $index: Int
  ) {
    updateProject(
      _id: $_id,
      title: $title,
      to: $to,
      featuredImage: $featuredImage,
      description: $description,
      index: $index
    ) {
      to
      description
      title
      featuredImage
    }
  }
`;


export default graphql(updateSkill, {
  props: ({mutate}) => {
    return{
      updateSkill: (skill) => mutate({ variables: skill }),
    }
  },
})(graphql(updateProject, {
  props: ({mutate, ownProps:{_id}}) => {
    const index = +_id.split("_")[1];
    return {
      updateProject: (skill) => mutate({ variables: {...skill, index} }),
    }
  },
})(SkillEditor));
