import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Menu from "./Menu";

function Layout(props) {
  return (
    <>
      <Menu LoggedIn={props.LoggedIn}/>
      <Outlet />
    </>
  );
}

export default Layout;
