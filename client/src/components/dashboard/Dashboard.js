import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Modal, ModalHeader, ModalBody, Table, ModalFooter } from 'reactstrap'
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../../config"
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            isModalOpen: false,
            projects: []

        }
        this.toggleModal = this.toggleModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        axios.get(`${API}/projects/getAll`).then(res => {
            this.setState({
                projects: res.data
            })
        }).catch(err => console.log("Error in data fetching"));
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        this.toggleModal();
        const newProject = {
            name: this.state.name,
            description: this.state.description,
            creator: this.props.auth.user.id
        }
        console.log(newProject);
        axios.post(`${API}/projects/createProject`, newProject).then(res => {
            alert("Your project has been registered");
            axios.get(`${API}/projects/getAll`).then(res => {
                this.setState({
                    projects: res.data
                })
                console.log(this.state.projects);
            }).catch(err => alert("Error"));
        }).catch(err => alert("Please try after some time"))

    }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        console.log(this.props.auth)
        return (
            <div className="container">
                <div style={{textAlign:"center", marginTop:"25px", fontSize:"30px", marginBottom: "35px"}}><p> Welcome {user.name}</p></div>
                
                <div style={{marginBottom: "15px"}}>
                    <button className="btn btn-dark"
                        onClick={this.toggleModal}
                    >
                        Create Project
                    </button>

                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Create Project</ModalHeader>
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

                <Table style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Project Name</th>
                            <th>Description</th>
                            <th>More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map(({ _id, name, description}, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{name}</td>
                                <td>{description}</td>
                                <td><Link to={{pathname: 'project', state: {id: _id, name: name, description: description, creator: this.props.auth.user.id}}}><p>Details</p></Link></td>
                                
                            </tr>
                        )
                        )}
                    </tbody>
                </Table>
            </div>

        );

    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);