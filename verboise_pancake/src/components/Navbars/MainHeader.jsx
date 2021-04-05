import React from "react";
import { useLocation , useHistory} from "react-router";
import Header from "layouts/header";
import { Button} from 'react-bootstrap'

const MainHeader = (props) => {
  const route = useLocation();
  const history = useHistory()

  const renderLoginHeader = () => {
    if (route.pathname === "/login") {
      return (
        <Header>
          <Button className="btn-fill pull-right" type="submit" variant="info" onClick={()=>history.push('/Signup')}>
            Create an account
            
          </Button>
        </Header>
      );
    } else if (route.pathname === "/Signup") {
      return (
        <Header>
          <Button className="btn-fill pull-right" type="submit" variant="info" onClick={()=>history.push('/login')}>
            Login
          </Button>
        </Header>
      );
    } else {
      return <Header></Header>;
    }
  };

  return <div>{renderLoginHeader()}</div>;
};

export default MainHeader;
