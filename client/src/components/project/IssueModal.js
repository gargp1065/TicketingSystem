import React, { Component } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import classnames from  'classnames'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
class IssueModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', 
            description: '',
            issueType: '', 
            status: 0
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        const newIssue = {
            name: this.state.name,
            description: this.state.description,
            creator: this.props.cid, 
            issueType: this.state.issueType,
            // status: this.state.status
        }
        console.log(newIssue);


    }
    onChange(e) {
        this.setState ({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className='container'>
                {/* <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
                    <ModalHeader toggle={this.props.toggleModal}>Update Project</ModalHeader>
                    <ModalBody> */}
                        <form onSubmit={this.onSubmit}>
                            <label htmlFor="name">Issue Name</label>
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                            <label htmlFor="description">Issue Description</label>
                            <input
                                type="text"
                                className={classnames("form-control form-control-lg")}
                                placeholder="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                            />

                            <label htmlFor="issueType">Choose the type</label>
                            <select
                                type="text"
                                className={classnames("form-control form-control-lg")}//,{
                                //   "is-invalid": errors.duration
                                // })}
                                placeholder="issueType"
                                name="issueType"
                                value={this.state.type}
                                onChange={this.onChange}
                            >
                            <option value>Select Type</option>
                            <option value="bug">Bug</option>
                            <option value="task">Task</option>  
                            </select>



                            <input type="submit" className="btn btn-info btn-block mt-4" value="Add Issue"/>
                        </form>
                    {/* </ModalBody> */}
                    
                {/* </Modal> */}

            </div>
        )
    }
}

const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect (
    mapStatesToProps
)(withRouter(IssueModal))