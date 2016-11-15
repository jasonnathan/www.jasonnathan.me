/* global document*/
import React from 'react';
import PostWithComments from './PostWithComments.jsx';

export default function Article(props){
  return (
    <div role="main" style={{position:"fixed", top:0, left:0, width:"100vw", height:"100vh", background:"#222"}}>
      <section className="content" style={{bottom:0}}>
        <PostWithComments {...props} />
      </section>
    </div>
  )
}
