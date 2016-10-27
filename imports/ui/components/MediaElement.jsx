import React, {PropTypes} from 'react';
import ScaledInImage from './ScaledInImage.jsx'

const MediaElement = ({
  children,
  file,
  dim = 40
}) => (
  <div className="absolute-center top-box">
    <ScaledInImage className="Avatar" src={file} size={dim} /> {children}
  </div>
)

MediaElement.propTypes = {
  file: PropTypes.string,
  dim: PropTypes.number,
  children: React.PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}

export default MediaElement;
