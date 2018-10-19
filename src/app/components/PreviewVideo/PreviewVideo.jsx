import React from 'react';
import PropTypes from 'prop-types';
import Video from '../Video/Video';

class PreviewVideo extends React.Component {
  constructor(...options) {
    super(...options);

    this.state = {
      play: false,
      position: 0
    };

    this.togglePlay = this.togglePlay.bind(this);
  }

  togglePlay(play) {
    this.setState({
      play,
      position: !play ? 0 : this.state.position
    });
  }

  render() {
    const { src, poster, type } = this.props;
    const { play, position } = this.state;
    return (
      <div
        className="c-video"
        onMouseOut={() => this.togglePlay(false)}
        onBlur={() => this.togglePlay(false)}
        onMouseOver={() => this.togglePlay(true)}
        onFocus={() => this.togglePlay(true)}
      >
        <Video
          {...{
            src,
            poster,
            type,
            play,
            position
          }}
        />
      </div>
    );
  }
}

PreviewVideo.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};

export default PreviewVideo;
