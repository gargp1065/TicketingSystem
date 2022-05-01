import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Modal, ModalHeader, ModalBody, Table, ModalFooter } from 'reactstrap'
import classnames from "classnames";
import axios from "axios";
import IssueTable from './IssueTable'
import { API } from "../../config"
import background from '../../public/bug3.jpg'


class ViewIssues extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            name: this.props.location.state.name, 
            description: this.props.location.state.description,
            project: [],
            issues: []
        }
    this.onLogoutClick = this.onLogoutClick.bind(this);
    this.onChange = this.onChange.bind(this);
    }

  
    componentDidMount() {
        axios.get(`${API}/issues/getAll`).then(res => {
            this.setState({
                issues: res.data
            })
        }).catch(err => console.log("Error in data fetching"));
    }

    onLogoutClick = e => {
        e.preventDefault();
        console.log("error")
        this.props.logoutUser();
    };
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh"}} className="Container">
                <div className="row">
                    <div className="col s12 center-align">
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable dark blue accent-4"
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className ="details" style={{  
                              /*  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", */
                                maxWidth: "800px",
                                margin: "auto",
                                fontFamily: "arial"
                            }}>
                    <h3 style={{textAlign:"center"}}>{this.state.name} </h3>
                    <p className="grey-text text-darken-1" style={{fontSize:"22px"}}>{this.state.description}</p>
                </div>

                <div className="row">
                    {this.state.issues.map(({_id,title, issueType, status, description}, index) => (
                    <div className="col-sm-4">
                        <div className="card blue-grey darken-1 img-fluid" style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
                            
                            <div className="card-body">
                            <h1 className = "text-white" style={{
                                borderRadius: "3px",
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>Issue Title: {title}</h1>
                            <h4 className="card-text text-white" style={{
                                borderRadius: "3px",
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>Issue Type: {issueType}</h4>
                            <h4 className="card-text text-white" style={{
                                borderRadius: "3px",
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>Issue Status: {status}</h4>
                            <p className="card-text text-white" style={{
                                borderRadius: "3px",
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>Issue Description: {description}</p>
                            <p><button className="btn btn-small waves-effect waves-light hoverable dark blue accent-4" style={{
                                width: "170px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}>Update Status</button>
                            {'\u00A0'}{'\u00A0'}<button className="btn btn-small waves-effect waves-light hoverable dark blue accent-4" style={{
                                width: "170px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}>Delete Issue</button></p>
                            </div>
                        </div>
                    </div>
                    )
                    )}
                </div>
            
            </div>
        );
    }
}
ViewIssues.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(ViewIssues);