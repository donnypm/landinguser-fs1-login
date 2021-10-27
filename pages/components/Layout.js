import Navbar from "./Navbar";

const Layout = ({ children }) => {
  console.log('sfs')
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
