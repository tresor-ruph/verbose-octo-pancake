import react, { useState } from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { test } from "./../../store/session/sess-actions";

const Login = () => {
  const [click, setClick] = useState(false);
  const [currUser, setUser] = useState("");
  const { user } = useSelector((state) => state.SessionReducer);
  const dispatch = useDispatch();

  const reveal = () => {
    setClick((prevState) => !prevState);
  };

  return (
    <div>
      <p>{user.username}</p>
      <button onClick={() => reveal()}>click me</button>
      {click && (
        <div>
          {" "}
          <input
            type="text"
            placeholder="enter new user"
            value={currUser}
            onChange={(event) => setUser(event.target.value)}
          />
          <button
            onClick={() =>
              dispatch({
                type: "LOG_IN",
                payload: { sessionId: "qsdsqdqs", user:{username: currUser} },
              })
            }
          >
            add user
          </button>
        </div>
      )}
    </div>
  );
};


export default Login;
