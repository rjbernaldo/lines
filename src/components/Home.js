import React, { Component } from 'react';

import GBox from 'grommet/components/Box';
import GHeading from 'grommet/components/Heading';
import GParagraph from 'grommet/components/Paragraph';
import GAnchor from 'grommet/components/Anchor';
import GAccordion from 'grommet/components/Accordion';
import GAccordionPanel from 'grommet/components/AccordionPanel';
import GCheckBox from 'grommet/components/CheckBox';

const Home = () => (
  <GBox flex="grow">
    <GBox pad="medium" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
      <GHeading strong={true} tag="h2" style={{ paddingTop: '12px' }}>Hello World!</GHeading>
      <GParagraph>
        Praesent id metus massa, ut blandit odio. Proin quis tortor orci.
        Etiam at risus et justo dignissim congue.
        Donec congue lacinia dui, a porttitor lectus condimentum laoreet.
      </GParagraph>
      <GAnchor href="https://github.com/rjbernaldo/asm-toolbox" label="https://github.com/rjbernaldo/asm-toolbox" />
    </GBox>
  </GBox>
);

export default Home;
