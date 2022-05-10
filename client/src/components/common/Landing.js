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
            
            <p className="flow-text text-dark text-darken-1">
                WELCOME TO PROJECT TICKETING SYSTEM.
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
                className="btn btn-large btn-flat waves-effect hoverable accent-3 text-dark"
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