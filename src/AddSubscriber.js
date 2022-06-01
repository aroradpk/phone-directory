import React, { Component } from "react";
import Header from "./Header";
import "./addSubscriber.css";
import {Link, useNavigate} from 'react-router-dom';


class AddSubscriber extends Component {
    constructor() {
        super();
        this.state = {
            id: '0',
            name: '',
            phone: ''
        }
    }
    inputChangedHandler = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
        
    }

    onFormSubmitted = (e) => {
        e.preventDefault();
        this.props.addSubscriberHandler(this.state);
        this.setState({ id: 0, name: '', phone: '' });
    }

    render() {
        const { name, phone } = this.state;
        return (
            <div>
                <Header heading="Add Subscriber" />
                <div className="component-body-container">
                    <Link to="/"><button className="custom-btn">Back</button></Link>
                    <form className="subscriber-form" onSubmit={this.onFormSubmitted.bind(this)}>
                        <label htmlFor="name" className="label-input">Name:</label><br />
                        <input id="name" type="text" className="input-control" name="name" placeholder="Enter Name" onChange={this.inputChangedHandler} /><br /><br />
                        <label htmlFor="phone" className="label-input">Phone:</label><br />
                        <input id="phone" type="number" className="input-control" name="phone" placeholder="Enter Phone Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange={this.inputChangedHandler} /><br /><br />
                        <div className="subscriber-info-container">
                            <span className="subcriber-to-add-heading">Subscriber to be added:</span><br />
                            <span className="subscriber-info">Name: {name}</span><br />
                            <span className="subscriber-info">Phone: {phone}</span>
                        </div>
                        <button type="submit" className="custom-btn add-btn">Add</button>
                    </form>
                </div>
            </div>

        )
    }
}

export default AddSubscriber;