import React, { Component } from 'react';

import GLayer from 'grommet/components/Layer';

class Modal extends React.Component {
  componentDidMount() {
    const { closeModal } = this.props;
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) closeModal();
    }, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', () => {}, true);
  }

  render() {
    if (this.props.open) {
      return (
        <GLayer>
          { this.props.form }
        </GLayer>
      );
    }

    return (
      <span />
    );
  }
}

export default Modal;

