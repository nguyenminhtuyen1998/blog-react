import './login.css'
import { Link, useHistory } from "react-router-dom"
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actLoginAsync } from '../../store/auth/actions'
import { useEffect } from 'react'

function LoginPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuthenticated = useSelector( state => Boolean(state.Auth.token))

    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState("")
    const [isDirty, setIsDirty] = useState(false)
    const [formData, setFormData] = useState({
        username: {
            value: "",
            error: ""
        },
        password: {
            value: "",
            error: ""
        }
    })

    useEffect( ()=> {
        if(isAuthenticated){
            history.push('/')
        }
    },[isAuthenticated])

    function validateFormData( { value, name } ){
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

        return error 
    }

    function checkFormIsValid(){
        if(isDirty === false){
            setFormData({
                username: {
                    value: "",
                    error: validateFormData( { value : "", name : "username"})
                },
                password: {
                    value: "",
                    error: validateFormData( { value : "", name : "password"})
                }
            })
            return false
        }

        if(formData.username.error || formData.password.error){
            return false
        }else{
            return true
        }

        
    }

    function handleSubmit(evt){
        evt.preventDefault()
        checkFormIsValid()

        if(loading){
            return
        }

        setLoading(true)
        setFormError("")
        // if(isValid === false){
        //     console.log("form error...")
        // }else{
           
        // }
        
       
        dispatch(actLoginAsync(formData.username.value, formData.password.value))
        .then ( res => {
            if(res.ok){
                 history.push('/')
            }else{
                setFormError(res.error)
                setLoading(false)
            }
        })
       

       
       
    
       
    }

    function handleOnChange(evt){
        const name = evt.target.name
        const value = evt.target.value
        const error = validateFormData( { value, name } )
        setFormData({
            ...formData,
            [name] : {
                value,
                error,
            }
        })

        setIsDirty(true)

    }


    return (
        <main className="login">
            <div className="spacing" />
            <div className="tcl-container">
                <div className="tcl-row">
                    <div className="tcl-col-12 tcl-col-sm-6 block-center">
                        <h1 className="form-title text-center">Đăng nhập</h1>
                        <div className="form-login-register">
                            <form autoComplete="off" onSubmit={handleSubmit}>
                                <p className="form__error">{formError}</p>
                                <Input
                                    label="Tên đăng nhập"
                                    placeholder="Nhập tên đăng nhập ..."
                                    autoComplete="off"
                                    name = "username"
                                    value = {formData.username.value}
                                    error = {formData.username.error}
                                    onChange = {handleOnChange}
                                />
                                <Input
                                    type="password"
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu của bạn ..."
                                    autoComplete="new-password"
                                    name = "password"
                                    value = {formData.password.value}
                                    onChange = {handleOnChange}
                                    error = {formData.password.error}
                                />

                                <div className="d-flex tcl-jc-between tcl-ais-center">
                                    <Button type="primary" size="large" loading={loading}>Đăng nhập</Button>
                                    <Link to="/register">Đăng ký</Link>
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

export default LoginPage