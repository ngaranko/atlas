import React from 'react'
import PropTypes from 'prop-types'
import Video from '../Video/Video'

class PreviewVideo extends React.Component {
  constructor(...options) {
    super(...options)

    this.state = {
      play: false,
      position: 0,
    }

    this.togglePlay = this.togglePlay.bind(this)
  }

  togglePlay() {
    const { play, position } = this.state
    const newPlayState = !play
    this.setState({
      play: newPlayState,
      position: newPlayState ? position : 0,
    })
  }

  render() {
    const { src, poster, type } = this.props
    const { play, position } = this.state
    return (
      <div
        className="c-video"
        onMouseOut={this.togglePlay}
        onBlur={this.togglePlay}
        onMouseOver={this.togglePlay}
        onFocus={this.togglePlay}
      >
        <Video
          {...{
            src,
            poster,
            type,
            play,
            position,
          }}
        />
      </div>
    )
  }
}

PreviewVideo.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
}

export default PreviewVideo
