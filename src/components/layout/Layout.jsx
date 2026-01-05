import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex flex-col'>
      <main className='flex-grow 2xl:w-full px-0 mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;