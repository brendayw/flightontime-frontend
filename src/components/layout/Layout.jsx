import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col ">
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-0 mx-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;