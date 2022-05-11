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
import { Link } from "react-router-dom";
// import issue from "../../../../models/issue";


class ViewIssues extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            id: this.props.location.state.id,
            name: this.props.location.state.name,
            description: this.props.location.state.description,
            project: [],
            issues: []
        }
    this.onChange = this.onChange.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    }

    
  
    componentDidMount() {
        axios.get(`${API}/issues/getProjectIssue/${this.state.id}`).then(res => {
            this.setState({
                issues: res.data
            })
            console.log(this.state.issues);
        }).catch(err => console.log("Error in data fetching"));
        // console.log(this.state.issues);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    deleteIssue(id) {
        const issueId = id
        axios.delete(`${API}/issues/deleteIssue/${issueId}`)
        .then(res => {
            alert("Issue has been deleted");
            var allotIndex;
            for(var i=0;i<this.state.issues.length;i++)
            {
                if(this.state.issues[i]._id === issueId)
                    allotIndex = i;
            }
            this.setState({
                issues: [...this.state.issues.slice(0, allotIndex), ...this.state.issues.slice(allotIndex + 1)]   
            })
        }).catch(err => console.log("Error in deleting issue"));
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh"}} className="Container">

                <div className="details" style={{
                    textAlign: "center",
                    maxWidth: "800px",
                    margin: "auto",
                    fontFamily: "arial",
                    marginTop: "30px"
                }}>
                    <p style={{fontSize: "25px"}}>Project Name: {this.state.name} </p>
                    <p style={{ fontSize: "25px" }}>Project Decription: {this.state.description}</p>

                </div>

                <div className="row">
                    {this.state.issues.length == 0 ? (<div style={{textAlign:"center", marginTop:"25px", fontSize:"30px", marginBottom: "35px"}}><p>No issues created for this project.</p></div>): 
                    this.state.issues.map(({_id,title, issueType, status, description}, index) => (
                    <div className="col-sm-4">
                        <div className="card">
                            
                            <div className="card-body">
                            <h1 style={{
                                borderRadius: "3px",
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>Issue Title: {title}</h1>
                            <h4 className="card-text" style={{
                                borderRadius: "3px",
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>Issue Type: {issueType}</h4>
                            <h4 className="card-text" style={{
                                borderRadius: "3px",
                                marginTop: "1rem",
                                marginBottom: "1rem"
                            }}>Issue Status: {status}</h4>
                            <p><Link to={{pathname: '/updateIssue', state:{id: _id, status: status}}}><button className="btn btn-small waves-effect waves-light hoverable dark blue accent-4" style={{
                                width: "170px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }}>Update Status</button></Link>
                            {'\u00A0'}{'\u00A0'}<button className="btn btn-small waves-effect waves-light hoverable dark blue accent-4" style={{
                                width: "170px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem",
                            }} onClick={() => this.deleteIssue(_id)}>Delete Issue</button></p>
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