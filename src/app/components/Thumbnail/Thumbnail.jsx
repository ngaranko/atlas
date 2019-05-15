import React from 'react';
import PropTypes from 'prop-types';
import './Thumbnail.scss';

const Thumbnail = ({ src, title }) => {
  return (
    <figure className="thumbnail">
      <img src={src} alt={title} />
      <figcaption className="viewer-controls__meta">
        <span className="viewer-controls__meta__item">{title}</span>
      </figcaption>
    </figure>
  );
};

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Thumbnail;
