import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { actLogout } from "../../store/auth/actions"

function HeaderMenus() {

    const user = useSelector(state => state.Auth.currentUser)
    const dispatch = useDispatch()
    let currentUser = ""

    if (user) {
        currentUser = user.nickname
    } else if (user === null) {
        currentUser = "tài khoản"
    }

    function handleLogout(evt){
        evt.preventDefault()
        dispatch(actLogout())
    }

    return (
        <div className="tcl-col-6">
            {/* Nav */}
            <div className="header-nav">
                <ul className="header-nav__lists">
                    <li><a href="/">Home</a></li>
                    <li>
                        <a href="/">Our Team</a>
                        <ul>
                            <li><a href="/">Our Team 1</a></li>
                            <li><a href="/">Our Team 2</a></li>
                            <li><a href="/">Our Team 3</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/">Contact</a>
                        <ul>
                            <li><a href="/">Contact 1</a></li>
                            <li><a href="/">Contact 2</a></li>
                            <li>
                                <a href="/">Contact 3</a>
                                <ul>
                                    <li><a href="/">Contact 11</a></li>
                                    <li><a href="/">Contact 12</a></li>
                                    <li><a href="/">Contact 13</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="header-nav__lists">
                    <li className="user">
                        <Link to="/login"><i className="icons ion-person" />{currentUser}</Link>
                        <ul>
                            <li>
                                <a href="/" onClick={handleLogout}>Đăng xuất</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HeaderMenus