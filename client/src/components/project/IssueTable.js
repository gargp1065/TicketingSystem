import React, { Component } from 'react';
import classnames from 'classnames'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { API } from "../../config"
class IssueTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            issueType: '',
            assignee: '',
            status: 'open',
            userList: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    componentDidMount() {
        axios.get(`${API}/users/getAll`).then(res => {
            this.setState({
                userList: res.data
            })
        }).catch(err => alert(err));
    }



    onSubmit(e) {
        e.preventDefault();
        console.log(this.props); 
        const newIssue = {
            projectId: this.props.pid,
            issueType: this.state.issueType,
            title: this.state.title,
            description: this.state.description,
            creator: this.props.auth.user.id,
            assignee: this.state.assignee,
            status: this.state.status
        }
        console.log(newIssue);
        axios.post(`${API}/issues/createIssue`, newIssue).then(res => {
            alert("New Issue has been created.");
            this.setState({
                issueType: '',
                title: '',
                description: '',
                assignee: '',
                status: 'open'
            })
        }).catch(err => alert(err));

    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div style={{margin: "auto", marginTop: "55px", maxWidth:"800px"}}>

                <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                    
                    <input
                        type="text"
                        // className={classnames("form-control form-control-sm")}
                        // placeholder="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.onChange}
                    />
                    <label htmlFor="title">Issue Name</label>
                    </div>
                    <div className="input-field">
                    
                        <input
                            type="text"
                            className={classnames("form-control form-control-sm")}
                            // placeholder="description"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChange}
                        />
                        <label htmlFor="description">Issue Description</label>
                    </div>
                    <div>
                    <label htmlFor="issueType">Choose the type</label>
                    <select
                        type="text"
                        className={classnames("form-control form-control-lg")}//,{
                        //   "is-invalid": errors.duration
                        // })}
                        placeholder="issueType"
                        name="issueType"
                        value={this.state.issueType}
                        onChange={this.onChange}
                    >
                        <option value>Select Type</option>
                        <option value="bug">Bug</option>
                        <option value="task">Task</option>
                    </select>
                    </div>
                    <div>
                    <label htmlFor="assignee">Choose the Assignee</label>
                        <select 
                            type="text"
                            className={classnames("form-control form-control-lg")}
                            placeholder="assignee"
                            name="assignee"
                            onChange={this.onChange}
                        >
                            <option value>Select Assignee</option>
                            {this.state.userList.map((user) => <option key={user._id}value={user._id}>{user.name}</option>)}
                        </select>
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" value="Add Issue" />
                </form>

            </div>
        )
    }
}

const mapStatesToProps = state => ({
    auth: state.auth,
});

export default connect(
    mapStatesToProps
)(withRouter(IssueTable))