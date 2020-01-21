import React from 'react'
import "./SortingVisualizer.css"
import {Button, Navbar, Nav, NavItem,Container} from 'reactstrap'


export default class SortingButtons extends React.Component {
    constructor(props){
        super(props); 
    }

    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md">
                    <Nav className ="mx-auto" navbar>
                            <NavItem>
                                <Button className = "mr-3" color ="info" onClick={this.props.newArray}> Create new array</Button>
                            </NavItem>

                            <NavItem>
                                <Button className = "mr-3" color ="info" onClick={this.props.startQS}>Quick Sort it</Button>
                            </NavItem>

                            <NavItem>
                                <Button className = "mr-3" color ="info" onClick={this.props.startIS}>Insertion sort it</Button>
                            </NavItem>

                            <NavItem>
                                <Button className = "mr-3" color ="info" onClick={this.props.startBS}>Bubble sort it</Button>
                            </NavItem>

                            <NavItem>
                                <Button className = "mr-3" color ="info" onClick={this.props.startHS}>Heap sort it</Button>
                            </NavItem>
                    </Nav>
                </Navbar>
            </div>       
        )
    }
}