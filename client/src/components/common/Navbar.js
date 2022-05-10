import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick = e => {
    e.preventDefault();
    console.log("error")
    this.props.logoutUser();
  };

  render() {
    console.log(this.props);
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper dark" style={{ backgroundColor: "teal" }}>
            <Link
              to={this.props.auth.isAuthenticated ? "/dashboard" : "/"}
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              {/* <i className="material-icons">code</i> */}
              Ticketing System
            </Link>
            <div style={{ marginLeft: "80%" }}>
              <Link to="profile">
                {this.props.auth.isAuthenticated && <button type="button" className="btn btn-dark hoverable light accent-5"
                  style={{
                    width: "120px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    backgroundColor: "black"
                    // marginLeft: "40%"
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                  </svg>
                  Profile
                </button>}
              </Link>
              {this.props.auth.isAuthenticated && <button style={{
                width: "120px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginLeft: "10px"
              }}
                onClick={this.onLogoutClick}
                className="btn btn-dark hoverable light accent-5">Logout
              </button>}
            </div>
          </div>

        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);