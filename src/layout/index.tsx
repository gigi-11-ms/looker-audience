import React, { PropsWithChildren, FC, useEffect } from 'react';
import Header from '../components/Header/index';
import { Box, Space, SpaceVertical } from '@looker/components';
import Navigation from '../components/Navigation/index';
import { useHistory, useLocation } from 'react-router-dom';
import { AUDIENCES_PAGE } from '../routes/config';

const Layout: FC<PropsWithChildren<any>> = ({ children }) => {
  const history = useHistory();

  // Temp
  useEffect(() => {
    history.replace(AUDIENCES_PAGE);
  }, []);
  return (
    <SpaceVertical flex={1} gap={'none'} minHeight={'100dvh'}>
      <Header />
      <Space flex={1} align='stretch' gap='none'>
        <Box backgroundColor={'rgb(235 235 235)'} p={16} minWidth={300}>
          <Navigation />
        </Box>
        <SpaceVertical style={{ overflow: 'auto' }}>{children}</SpaceVertical>
      </Space>
    </SpaceVertical>
  );
};

export default Layout;
