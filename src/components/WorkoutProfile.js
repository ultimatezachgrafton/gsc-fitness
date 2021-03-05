import React, { Component } from 'react'

export default class WorkoutProfile extends Component {
    
    useEffect(() => {
        // if currentUser matches the url
        const pathname = window.location.pathname;
        const userName = pathname.split("/");
        console.log(currentUser.uid);
        if ((currentUser.email) !== userName[2]) {
            handleLogout();
        }
    });

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
