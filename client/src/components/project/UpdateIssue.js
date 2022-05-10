import react, { Component } from 'react'
import { connect } from "react-redux"
import classnames from 'classnames'
import axios from 'axios';
import {API} from '../../config'
class UpdateIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.location.state.status, 
            issue: {}
        }
        // this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        axios.get(`${API}/issues/detailIssue/${this.props.location.state.id}`).then((res) => {
            this.setState({
                issue: res.data
            })

        }).catch(err => console.log(err))

    }
    onUpdate(e) {
        e.preventDefault();

    }
    onSubmit = e => {
        e.preventDefault();
        const issueId = this.props.location.state.id
        alert(issueId);
        console.log(issueId);
        const updatedIssue = {
            status: this.state.status
        }
        axios.put(`${API}/issues/updateIssue/${issueId}`, updatedIssue).then(res => {
            alert("Status have been updated");
            this.setState({
                status: this.state.status
            })
            this.props.location.state.status = this.state.status
            axios.get(`${API}/issues/detailIssue/${this.props.location.state.id}`).then((res) => {
                this.setState({
                    issue: res.data
                })
    
            }).catch(err => console.log(err))
        }).catch(err => alert("Error in updating the status"))
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        console.log(this.props);
        // Open -> InProgress -> InReview -> CodeComplete->Qa->done
        var map1 = {};
        map1["open"] = ["inprogress"];
        map1["inprogress"] = ["open", "inreview"];
        map1["inreview"] = ["open", "inprogress", "codecomplete"]
        map1["codecomplete"] = ["open", "inprogress", "inreview", "QA"];
        map1["QA"] = ["open", "inprogress", "inreview", "codecomplete", "done"];
        map1["done"] = ["open", "inprogress", "inreview", "codecomplete", "QA"];
        var status = this.props.location.state.status;
        return (

            <div className="container">
                <div className="details" style={{
                    
                    maxWidth: "800px",
                    margin: "auto",
                    fontFamily: "arial",
                    marginTop: "30px"
                }}>
                    <p style={{fontSize: "20px"}}>Issue Name: {this.state.issue.title} </p>
                    <p style={{ fontSize: "20px" }}>Issue Description: {this.state.issue.description}</p>
                    <p style={{fontSize: "20px"}}>Type: {this.state.issue.issueType}</p>
                    <p style={{fontSize: "20px"}}>Status: {this.state.issue.status}</p>
                    {/* <p style={{fontSize: "20px"}}>Reporter: {this.state.reporter}</p>
                    <p style={{fontSize: "20px"}}>Assignee: {this.state.assignee}</p> */}


                </div>
                <div style={{maxWidth: "800px", margin: "auto",
                    fontFamily: "arial",
                    marginTop: "30px"   }}>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="status">Select Status</label>
                        <select
                            type="text"
                            className={classnames("form-control form-control-lg")}
                            placeholder="status"
                            name="status"
                            onChange={this.onChange}
                        >
                            <option value>Status</option>
                            {map1[status].map((user, index) => <option key={index}value={user}>{user}</option>)}
                        </select>
                        <div style={{marginTop: "10px"}}>
                            <input type="submit" className="btn btn-small waves-effect waves-light hoverable dark accent-4" value="Update Status"/>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
)(UpdateIssue);