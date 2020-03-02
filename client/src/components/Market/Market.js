import React, {Component} from 'react';
class Market extends Component{
    state = {
            users: [],
        };
    componentDidMount() {
        fetch('/api/')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }
    render() {
        return (
            <div>
                <h1>Страница Schedule</h1>
            </div>
        )
    }
}
export default Market;
