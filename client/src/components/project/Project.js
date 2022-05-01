import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Modal, ModalHeader, ModalBody, Table, ModalFooter } from 'reactstrap'
import classnames from "classnames";
import axios from "axios";
import IssueTable from './IssueTable'
import { API } from "../../config"


class Project extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            name: this.props.location.state.name,
            description: this.props.location.state.description,
            project: [],
            isModalOpen: false,
        }
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.viewIssues = this.viewIssues.bind(this);
    }


    deleteProject(e) {
        e.preventDefault();
        axios.delete(`${API}/projects/deleteProject/${this.props.location.state.id}`).then(res => {
            alert("Project deleted");
            this.props.history.push('/dashboard');
        }).catch(err => alert("Error in deleting"));
    }

    viewIssues(e) {
        this.props.history.push({
            pathname: 'issues', state: { id: this.props.location.state.id, name: this.props.location.state.name, description: this.props.location.state.description, creator: this.props.auth.user.id }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.toggleModal();
        const updatedProject = {
            name: this.state.name,
            description: this.state.description
        }
        console.log(updatedProject)
        const id = this.props.location.state.id;
        console.log(id);
        axios.put(`${API}/projects/updateProject/${id}`, updatedProject).then(res => {
            alert("Project details have been updated");
            this.props.location.state.name = this.state.name;
            this.props.location.state.description = this.state.description
            // this.props.history.push('/project');
        }).catch(err => alert("Error in updating project details."));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
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
            <div className="container">

                <div className="details" style={{
                    maxWidth: "800px",
                    margin: "auto",
                    fontFamily: "arial",
                    marginTop: "30px"
                }}>
                    <h2 style={{ textAlign: "center" }}>{this.state.name} </h2>
                    <p style={{ fontSize: "25px" }}>{this.state.description}</p>

                </div>
                <div style={{textAlign: "center", marginTop: "30px"}}>
                    <button className="btn btn-small waves-effect waves-light hoverable dark accent-4" onClick={this.toggleModal}>Update Project</button>
                    {'\u00A0'} <button className="btn btn-small waves-effect waves-light hoverable dark accent-4" onClick={this.deleteProject}>Delete Project</button>
                    {'\u00A0'} <button className="btn btn-small waves-effect waves-light hoverable dark accent-4" onClick={this.viewIssues} >View Issues</button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Update Project</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onSubmit}>
                            <label htmlFor="name">Project Name</label>
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            <label htmlFor="description">Project Description</label>
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                            />
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" onSubmit={this.onSubmit}>Do Something</Button>{'   '} */}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <IssueTable pid={this.props.location.state.id}></IssueTable>
                
                
            </div>
        );
    }
}
Project.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Project);