import React from "react";

const NotFoundUI = (props) => {
  const { expireLink, MainHeader } = props;
  return (
    <div>
      {MainHeader}
      {!expireLink ? (
        <div className="container bootstrap snippet">
          <div className="main-div">
            <div className="center-div">
              <p className="text-res">Page not found</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container bootstrap snippet">
          <div className="main-div">
            <div className="center-div">
              <p className="text-res">The Link expired</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotFoundUI;
