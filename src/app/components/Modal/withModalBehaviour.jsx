import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const propTypes = {
  id: PropTypes.string.isRequired,
  closeModalAction: PropTypes.func,
  open: PropTypes.bool,
}

function withModalBehaviour(WrappedComponent) {
  class Modal extends Component {
    constructor(props) {
      super(props)

      this.state = {
        open: props.open,
      }

      this.handleOpen = this.handleOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
    }

    // Hack to open the modal from other libraries than React (now used by angular)
    componentDidMount() {
      const { id } = this.props
      window.addEventListener(`openForm_${id}`, this.handleOpen)
    }

    componentDidUpdate(prevProps) {
      const { open } = this.props
      if (prevProps.open !== open) {
        this.handleOpen()
      }
    }

    componentWillUnmount() {
      const { id } = this.props
      window.removeEventListener(`openForm_${id}`, this.handleOpen)
    }

    handleOpen() {
      this.setState({ open: true })

      // Make sure all the elements on the page are overruled by the backdrop
      const rootElement = window.document.querySelector('#root')
      if (rootElement) {
        rootElement.setAttribute('style', 'z-index: -1')
      }
    }

    handleClose() {
      const { closeModalAction } = this.props
      this.setState({ open: false })
      closeModalAction()

      // Make sure all the elements on the page get their z-index back
      const rootElement = window.document.querySelector('#root')
      if (rootElement) {
        rootElement.removeAttribute('style', 'z-index')
      }
    }

    render() {
      const { open } = this.state
      return <WrappedComponent {...this.props} handleClose={this.handleClose} open={open} />
    }
  }

  Modal.defaultProps = {
    closeModalAction: () => {},
    open: false,
  }

  Modal.propTypes = propTypes

  return Modal
}

export default withModalBehaviour
