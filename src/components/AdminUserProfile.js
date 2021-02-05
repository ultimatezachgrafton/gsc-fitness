import React, { Component } from 'react'

export default class AdminUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.match.params.handle,
            loading: false
        }
    }

    componentDidMount() {
        const { handle } = this.props.match.params

        // fetch(`/${handle}`)
        //     .then((user) => {
        //         this.setState(() => ({ user }))
        //     })

        console.log(this.props.match.params.handle);
        console.log(this.state.user);
    }


    render() {
        return (
            <div>
                {this.state.user}
            </div>
        )
    }
}
