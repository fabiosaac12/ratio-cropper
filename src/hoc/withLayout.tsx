import React from 'react';
import { BaseLayout } from '../layouts';

export function withLayout<T>(
  Component: React.FC<T>,
  layout: 'base' = 'base',
): React.FC<T> {
  let Layout: React.FC;

  switch (layout) {
    case 'base':
      Layout = BaseLayout;
      break;
    default:
      throw new Error(`${layout} is not an available layout.`);
  }

  return (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );
}
