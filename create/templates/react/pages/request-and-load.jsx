import React from 'react';
import { Page, Navbar, Block, List, ListItem } from 'framework7-react';

export default (props) => {
  const { user } = props;

  return (
    <Page>
      <Navbar title={`${user.firstName} ${user.lastName}`} backLink="Back" />
      <Block strong>
        {user.about}
      </Block>
      <List>
        {user.links.map((link, index) => (
          <ListItem
            key={index}
            link={link.url}
            title={link.title}
            external
            target="_blank"
          ></ListItem>
        ))}
      </List>
    </Page>
  );
}
