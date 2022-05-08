import React, { Component } from "react";
import { Link } from "react-router-dom";
import background from '../../public/frontPage.png'
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "90vh", widht: "100vh", backgroundImage: `url(${background})`, backgroundRepeat: "round"}} className="valign-wrapper">
        <div className = "container">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Build</b> a login/auth app with the{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
              scratch
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
            <br />
            <div className="col s6">
              <Link
                to="/register"
                className="btn btn-large waves-effect waves-light hoverable accent-3" style={{backgroundColor: 'burlywood', width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px", marginTop: "1rem"}}
              >
                Register
              </Link>
            </div>
            <div className="col s6" style={{paddingLeft: '11.25px'}}>
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px", 
                  marginTop: "1rem",
                  backgroundColor: "burlywood"
                }}
                className="btn btn-large btn-flat waves-effect hoverable accent-3"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
export default Landing;