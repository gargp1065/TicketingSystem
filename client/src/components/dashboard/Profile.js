import react, { Component } from 'react'
import { Button } from 'reactstrap';
import { connect } from "react-redux";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onBack = this.onBack.bind(this);
    }
    onBack = e => {
        e.preventDefault();
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div className="container">

            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps
)(Profile);