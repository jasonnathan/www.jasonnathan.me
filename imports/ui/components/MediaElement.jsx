/**
 * @function MediaElement
 * @description A simple component for centering an image on top of text below
 * it
 */
import React from 'react';
import PropTypes from 'prop-types';
import FadeInImage from './FadeInImage.jsx'

const MediaElement = ({
  children,
  file,
  dim = 40
}) => (
  <div className="absolute-center top-box">
    <FadeInImage className="Avatar" src={file} size={dim} /> {children}
  </div>
)

MediaElement.propTypes = {
  file: PropTypes.string,
  dim: PropTypes.number,
  children: React.PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default MediaElement;
