import React, { Component } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { auth } from  '../../../_actions/user_action'
import { Layout, Menu, Breadcrumb } from 'antd'
import LangdingPage from '../LandingPage/LangdingPage';
const { Header } = Layout

function NavBar(props) {

    const dispatch = useDispatch()

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
    const onLoginHandler = () => {
        dispatch(auth().then(response => {
            
        }))
    }

    return (
            <Menu mode="horizontal">
                <Menu.Item key="home" ><Link to='/' />Home</Menu.Item>
                <Menu.Item key="login"><Link to='/login'></Link>Login</Menu.Item>
                <Menu.Item key="register"><Link to='/register'/>Sign up</Menu.Item>
                <Menu.Item key="Logout" disabled={onLoginHandler} onClick={onClickHandler}>Logout</Menu.Item>
            </Menu>
    )
}

export default NavBar
