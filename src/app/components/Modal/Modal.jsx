import React, { Component } from 'react';
import { Button, Divider, IconButton, ListItem, Modal, TopBar, Typography } from '@datapunt/asc-ui';
// eslint-disable-next-line
import Close from 'svg-react-loader?name=Close!@datapunt/asc-assets/lib/Icons/Close.svg';
import { routing } from '../../../app/routes';

const MAILTO_FEEDBACK = 'mailto:terugmelding.basisinformatie@amsterdam.nl?subject=Terugmelding%20data.amsterdam.nl&body=Terugmeldingen%20voor%20de%20pagina%3A%20http%3A%2F%2Flocalhost%3A8080%2Fdata%2Fbag%2Fpand%2Fid0363100012168052%2F%3Fcenter%3D52.3727874%252C4.8032235%26zoom%3D13%0A%0ABeschrijf%20zo%20volledig%20mogelijk%20van%20welk%20onjuist%20gegeven%20je%20een%20melding%20wilt%20maken%3A%0A-%20Welk%20gegeven%20is%20kennelijk%20onjuist%20of%20ontbreekt%3F%0A-%20Weet%20je%20wat%20het%20wel%20zou%20moeten%20zijn%3F%0A-%20Waarop%20is%20jouw%20constatering%20gebaseerd%3F%20Omschrijf%20de%20reden%20en%20voeg%20indien%20mogelijk%20relevante%20documenten%20in%20de%20bijlage%20toe%20(bijvoorbeeld%3A%20een%20bouwtekening%2C%20koopakte%2C%20et%20cetera).';
const MAILTO_PROBLEM = 'mailto:datapunt@amsterdam.nl?subject=Probleem%20melden%20of%20suggestie%20voor%20data.amsterdam.nl&body=Probleem%20melden%20voor%20de%20pagina%3A%20https%3A%2F%2Fdata.amsterdam.nl%2F%0A%0ABeschrijf%20zo%20volledig%20mogelijk%20waar%20je%20tegenaan%20loopt%3A%0A-%20Om%20welk%20onderdeel%20van%20de%20pagina%20gaat%20het%3F%0A-%20Wat%20zie%20je%20op%20het%20scherm%20als%20je%20een%20probleem%20ondervindt%3F%0A-%20Heb%20je%20een%20suggestie%20hoe%20het%20anders%20zou%20kunnen%3F%20';

class ModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener('openFeedbackForm', this.handleOpen);
  }

  componentWillUnmount() {
    window.removeEventListener('openFeedbackForm', this.handleOpen);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    return (
      <Modal
        aria-labelledby="feedback"
        aria-describedby="feedback"
        open={open}
        onClose={this.handleClose}
        blurredNode={document.querySelector('#root')}
      >
        <TopBar>
          <Typography style={{ flexGrow: 1 }} element="h4">
            Feedback
            <IconButton onClick={this.handleClose}>
              <Close />
            </IconButton>
          </Typography>
        </TopBar>
        <Divider />
        <ListItem>
          <Typography gutterBottom element="h5">
            Onjuiste of ontbrekende gegevens?
          </Typography>
          <Typography paragraph element="p" gutterBottom>
            Geef aan welke gegevens onjuist zijn of ontbreken. Ook als je weet wat het wel moet
            zijn. We horen het graag.
          </Typography>
          <Button
            as="a"
            href={MAILTO_FEEDBACK}
            color="primary"
          >
            Terugmelden
          </Button>
        </ListItem>
        <Divider gutter />
        <ListItem>
          <Typography gutterBottom element="h5">
            Vraag of een klacht?
          </Typography>
          <Typography paragraph element="p" gutterBottom>
            Als iets op deze pagina niet goed werkt, onduidelijk is of vragen oproept, geef het
            aan
            ons door.
          </Typography>
          <Button as="a" color="primary" href={MAILTO_PROBLEM}>Probleem melden</Button>
        </ListItem>
        <Divider transparent />
        <ListItem>
          <Typography element="a" href={routing.help.path}>
            Hulp nodig?
          </Typography>
        </ListItem>
      </Modal>
    );
  }
}

export default ModalComponent;
