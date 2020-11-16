import React from 'react';
import { Page, Navbar, Block, Link } from 'framework7-react';

const DynamicRoutePage = (props) => {
  const { f7route, f7router } = props;
  return (
    <Page>
      <Navbar title="Dynamic Route" backLink="Back" />
      <Block strong>
        <ul>
          <li><b>Url:</b> {f7route.url}</li>
          <li><b>Path:</b> {f7route.path}</li>
          <li><b>Hash:</b> {f7route.hash}</li>
          <li><b>Params:</b>
            <ul>
              {Object.keys(f7route.params).map(key => (
                <li key={key}><b>{key}:</b> {f7route.params[key]}</li>
              ))}
            </ul>
          </li>
          <li><b>Query:</b>
            <ul>
              {Object.keys(f7route.query).map(key => (
                <li key={key}><b>{key}:</b> {f7route.query[key]}</li>
              ))}
            </ul>
          </li>
          <li><b>Route:</b> {f7route.route.path}</li>
        </ul>
      </Block>
      <Block strong>
        <Link onClick={() => f7router.back()}>Go back via Router API</Link>
      </Block>
    </Page>
  );
}

export default DynamicRoutePage;
