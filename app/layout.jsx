import '@styles/global.css';
import Provider from '@components/Provider';
// import React from 'react'; // Import React
// import Home from './page'; // Import your Home component or any other components you want to render
import { Nav } from '@components/Nav';

export const metadata = {
  title: "Quotely",
  description: "discover"
};

const RootLayout = ({ children }) => { // Use 'children' instead of 'Children'
  return (
    <html lang="en">

        
      <body>
         <Provider>
        <div className="main">
          <div className="gradient"></div>
          <main className="app">
            <Nav/>
            {children} {/* Render children here */}
          </main>
        </div>
        </Provider>
      </body>


      
    </html>
  );
};

export default RootLayout;
