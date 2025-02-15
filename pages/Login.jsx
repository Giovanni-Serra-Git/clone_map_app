import { useState } from "react";
import Navbar from "./Navbar"
// import { useLoginUser } from "../context/LoginContextProvider";
import { useNavigate } from "react-router";
import useLogin from "../features/login/useLogin";
import { useDispatch } from "react-redux";
import { login } from "../features/login/loginSlice";

function Login() {

    const dispatch = useDispatch()

    // const {user, setIsAuth} = useLoginUser("")
    const {user} = useLogin()



    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function loginUser(e) {
        e.preventDefault()

        if (user.name != userName) setError("Invalid username o password")
        if (user.password != userPassword) setError("Invalid username o password")

        if (user.name === userName && user.password === userPassword) {
            dispatch(login())
            navigate("/app")
        }

    }

    return (
      <>
      <Navbar position="relative" background="bg-gray-800" />
        <div className="font-[sans-serif]">
            <div className="min-h-screen flex items-center justify-center bg-gray-800">
                <div className="flex justify-center w-full">
                    <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-xl bg-[rgba(20,20,20,0.8)]">
                        <form className="space-y-4" onSubmit={loginUser}>
                            <div className="mb-8">
                                <h3 className="text-white text-3xl font-bold">Sign in</h3>
                                <p className="text-gray-400 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
                                {error ? <p className="text-[#990000] font-bold text-center">{error}</p> : ""}
                            </div>

                            <div>
                                <label className="text-gray-200 text-sm mb-2 block">User name</label>
                                <div className="relative flex items-center">
                                    <input onChange={(e) => setUserName(e.target.value)} value={userName} name="username" type="text" required className="w-full text-sm text-white border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter user name" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                                        <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                                        <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-200 text-sm mb-2 block">Password</label>
                                <div className="relative flex items-center">
                                    <input onChange={e => setUserPassword(e.target.value)} value={userPassword} name="password" type="password" required className="w-full text-sm text-white border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter password" />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                                        <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                                    </svg>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="submit" className="cursor-pointer w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                                    Sign in
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
      </>
    )
}

export default Login;
