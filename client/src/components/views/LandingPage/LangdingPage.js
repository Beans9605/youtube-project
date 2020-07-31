import React, {useEffect} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Navbar from '../NavBar/NavBar'

function LangdingPage(props) {

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                props.history.push('/login')
            }
            else {
                alert("err")
            }
        })
    }


    return (

    <div>    
        <div style ={{display:'flex', justifyContent:'center', alignItems:"center",
        width:"100%", height:"100vh"}}>
            <h2>시작페이지</h2>



            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    </div>
    )
}

export default withRouter(LangdingPage)
