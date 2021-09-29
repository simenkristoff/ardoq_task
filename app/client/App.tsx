import React from 'react';

import { Layout } from 'antd';

import MapContainer from './containers/MapContainer';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Layout>
        <MapContainer />
      </Layout>
    </div>
  );
};

export default App;
