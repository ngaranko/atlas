import React from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Button,
  ListItem,
  Modal,
  TopBar,
  Heading,
  Paragraph,
} from '@datapunt/asc-ui/lib/index'
import { Close } from '@datapunt/asc-assets'
import withModalBehaviour, { propTypes as modalPropTypes } from './withModalBehaviour'
import './InfoModal.scss'

const InfoModal = ({ open, handleClose, title, body }) => (
  <Modal
    aria-labelledby="feedback"
    aria-describedby="feedback"
    open={open}
    onClose={handleClose}
    blurredNodeSelector="#root"
  >
    <TopBar>
      <Heading style={{ flexGrow: 1 }} as="h4">
        {title}
        <Button variant="blank" type="button" onClick={handleClose} icon={<Close />} />
      </Heading>
    </TopBar>
    <Divider />
    <ListItem>
      <Paragraph className="infomodal__body" dangerouslySetInnerHTML={{ __html: body }} />
    </ListItem>
  </Modal>
)

InfoModal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  ...modalPropTypes,
}

export default withModalBehaviour(InfoModal)
