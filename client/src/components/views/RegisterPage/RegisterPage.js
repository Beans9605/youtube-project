import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
    registerUser
} from '../../../_actions/user_action'

// 회원가입 페이지
function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, SetConfirmPassword] = useState("")

    const onNameHanlder = (event) => {
        setName(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        SetConfirmPassword(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }



    const onSubmitHandler = (event) => {
        // 페이지 refresh가 되는걸 막아줌
        event.preventDefault();


        if(Password !== ConfirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.")
        }

        let body = {
            name : Name,
            email : Email,
            password : Password
        }
        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                props.history.push('/login')
            }
            else {
                alert("Failed");
            }
        })

    }
    return (
        <div style ={{display:'flex', justifyContent:'center', alignItems:"center",
        width:"100%", height:"100vh"}}>
        
        <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHanlder} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler}/>
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
            <br/>
            <button type="submit">Sign Up</button>
        </form>
        </div>
    )
}

export default withRouter(RegisterPage)
