import React, { PropsWithChildren } from 'react';
import NavBar from '../NavBar/NavBar.tsx';

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;