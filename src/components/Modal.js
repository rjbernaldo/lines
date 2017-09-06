import React, { Component } from 'react';

import GLayer from 'grommet/components/Layer';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { submitModal } = this.props;

    submitModal({
      data: 'test',
    });
  }

  render() {
    if (this.props.open) {
      return (
        <GLayer>
          { this.props.form }
          <input type="button" onClick={this.handleClick} />
        </GLayer>
      );
    } else {
      return (
        <span />
      );
    }
  }
}

export default Modal;

