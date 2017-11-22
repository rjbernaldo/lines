import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GHeading from 'grommet/components/Heading';
import GParagraph from 'grommet/components/Paragraph';
import GButton from 'grommet/components/Button';

import CDrawing from '../containers/CDrawing';
import CModal from '../containers/CModal';

class Home extends React.Component {
  componentDidMount() {
    const { openModal, closeModal } = this.props;
    const style = { padding: '0px', margin: '0px', marginBottom: '5px', WebkitUserSelect: 'none' };
    const form = (
      <GBox style={{ width: '300px' }}>
        <GBox pad="medium">
          <GHeading tag="h3" style={{ WebkitUserSelect: 'none' }}>Instructions</GHeading>
          <GParagraph size="small" style={style}>Click Canvas/Anchor: Add anchor</GParagraph>
          <GParagraph size="small" style={style}>Double Click Anchor: End drawing</GParagraph>
          <GParagraph size="small" style={style}>Click & Drag Anchor: Move anchor</GParagraph>
          <GParagraph size="small" style={style}>Right Click Anchor: Delete anchor</GParagraph>
          <GParagraph size="small" style={style}>Right Click Length: Edit length</GParagraph>
          <GParagraph size="small" style={style}>Click & Drag Line: Move line</GParagraph>
          <GParagraph size="small" style={style}>Right Click Line: Delete line</GParagraph>
          <GParagraph size="small" style={style}>Right Click Angle: Edit angle</GParagraph>
          <GButton type="button" onClick={() => { closeModal(); }}>Close</GButton>
        </GBox>
      </GBox>
    );

    openModal(form);
  }

  render() {
    return (
      <GBox flex="grow">
        <GBox style={{ paddingTop: '0px', paddingBottom: '0px' }}>
          <CModal />
          <CDrawing />
        </GBox>
      </GBox>
    );
  }
}

export default Home;

