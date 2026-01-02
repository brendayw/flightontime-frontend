import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col ">
      <main className="flex-grow w-full px-0 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;