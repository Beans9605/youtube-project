import React, { Component } from 'react'
import Axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Auth from '../../../hoc/auth'
import { Layout, Menu, Breadcrumb } from 'antd'
import LangdingPage from '../LandingPage/LangdingPage';
const { Header } = Layout

function NavBar(props) {

    const onClickHandler = () => {
        Axios.get('api/users/logout/').then(response => {
            if(response.data.success){
                props.history.push('/login')
            }
            else {
                alert("err")
            }
        })
    }


    return (
            <Menu mode="horizontal">
                <Menu.Item key="home" ><Link to='/' />Home</Menu.Item>
                <Menu.Item key="login"><Link to='/login'></Link>Login</Menu.Item>
                <Menu.Item key="register"><Link to='/register'/>Sign up</Menu.Item>
                <Menu.Item key="Logout" onClick={onClickHandler}>Logout</Menu.Item>
            </Menu>
    )
}

export default NavBar
