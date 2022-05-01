import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, Table, ModalFooter } from 'reactstrap'
import classnames from "classnames";
import axios from "axios";
import IssueTable from './IssueTable'
import { API } from "../../config"
import background from "../../public/bug.jpg"
import "./Card.css"


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
    this.onChange = this.onChange.bind(this);
    }

  
    componentDidMount() {
        axios.get(`${API}/issues/getAll`).then(res => {
            this.setState({
                issues: res.data
            })
        }).catch(err => console.log("Error in data fetching"));
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh"}} className="Container">
                
                <div className="details" style={{
                    maxWidth: "800px",
                    margin: "auto",
                    fontFamily: "arial",
                    marginTop: "30px"
                }}>
                    <h2 style={{ textAlign: "center" }}>{this.state.name} </h2>
                    <p style={{ fontSize: "25px" }}>{this.state.description}</p>

                </div>

                <div className="row">
                    {this.state.issues.map(({_id,title, issueType, status, description}, index) => (
                    <div className="col-sm-4">
                        <div className="card" style={{backgroundImage: `url(${background})`, backgroundSize: "300px", backgroundRepeat: 'no-repeat'}}>
                            
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
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
)(ViewIssues);