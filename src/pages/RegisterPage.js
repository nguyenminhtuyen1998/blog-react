import './LoginPage/login.css'
import { Link, useHistory } from "react-router-dom"
import Input from '../components/shared/Input'
import Button from '../components/shared/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validateEmail } from '../helpers'
import { actRegister } from '../store/auth/actions'
import { useEffect } from 'react'

function RegisterPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [formError, setFormError] = useState("")
    const [formData, setFormData] = useState({
        nickname: {
            value: "",
            error: "",
           
        },
        username: {
            value: "aaaaa",
            error: "",
           
        },
        email: {
            value: "tuyen@gmail.com",
            error: "",
           
        },
        password: {
            value: "123456",
            error: "",
           
        }
    })


    function validateFormDataRegister({value,name}){
        let error = ""

        if(name === "username" && !value){
            error = "tên đăng nhập không được rỗng "
        }

        if(name === "password"){
            if(!value){
                error = "mật khẩu không được rỗng "
            }else if(value.length < 6 ){
                error = "mật khẩu phải có ít nhất 6 ký tự"
            }
        }

        if(name === "email"){
            if(!value){
                error = "email không được rỗng "
            }else if(!validateEmail(value)){
                error = "email không đúng định dạng"
            }
        }

        return error 
    }


    function checkFormIsValid(){
        const newFormData = {}

        Object.keys(formData).forEach( key => {
            const formValue = formData[key]

            newFormData[key] = {
                value: formValue.value,
                error: validateFormDataRegister( { value : formValue.value, name : key}),
            }
        })
        
        setFormData(newFormData)

        if(newFormData.username.error || newFormData.password.error || newFormData.email.error){
            return false
        }else{
            return true
        }

        
    }



    function handleSubmit(evt){
        evt.preventDefault()
        const isValid = checkFormIsValid()

        if(!isValid){
            return
        }


        dispatch(actRegister({
            nickname :formData.nickname.value,
            username: formData.username.value, 
            email: formData.email.value, 
            password: formData.password.value
        }))
        .then ( res => {
            if(res.ok){
                 history.push('/')
                // console.log("ok")
            }else{
                // setFormError(res.error)
                // setLoading(false)
                console.log(res.error)
                setFormError(res.error)
            }
        })

    }

    function handleOnChange(evt){
        const name = evt.target.name
        const value = evt.target.value
        const error = validateFormDataRegister( { value, name } )
        setFormData({
            ...formData,
            [name] : {
                value,
                error,
            }
        })
    }

    return (
        <main className="login">
            <div className="spacing" />
            <div className="tcl-container">
                <div className="tcl-row">
                    <div className="tcl-col-12 tcl-col-sm-6 block-center">
                        <h1 className="form-title text-center">Đăng ký</h1>
                        <div className="form-login-register">
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <p className="form__error">{formError}</p>
                                <Input
                                    label="Nickname"
                                    placeholder="Nhập Nickname"
                                    autoComplete="off"
                                    name="nickname"
                                    value = {formData.nickname.value}
                                    error = {formData.nickname.error}
                                    onChange = {handleOnChange}
                                />
                                <Input
                                    label="Tên đăng nhập (*)"
                                    placeholder="Nhập tên đăng nhập ..."
                                    autoComplete="off"
                                    name="username"
                                    value = {formData.username.value}
                                    error = {formData.username.error}
                                    onChange = {handleOnChange}
                                />
                                <Input
                                    label="Email (*)"
                                    placeholder="Nhập Email ..."
                                    autoComplete="off"
                                    name="email"
                                    value = {formData.email.value}
                                    error = {formData.email.error}
                                    onChange = {handleOnChange}
                                />
                                <Input
                                    type="password"
                                    label="Mật khẩu (*)"
                                    placeholder="Nhập mật khẩu của bạn ..."
                                    autoComplete="new-password"
                                    name="password"
                                    value = {formData.password.value}
                                    error = {formData.password.error}
                                    onChange = {handleOnChange}
                                />

                                <div className="d-flex tcl-jc-between tcl-ais-center">
                                    <Button type="primary" size="large">Đăng ký</Button>
                                    <Link to="/login">Bạn đã có tài khoản?</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="spacing" />
        </main>

    )
}

export default RegisterPage