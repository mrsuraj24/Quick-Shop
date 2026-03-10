import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, removeErrors, removeSuccess } from '../features/user/userslice';
import { toast } from 'react-toastify';
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { error, success, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email: loginEmail, password: loginPassword }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (isAuthenticated) {
            navigate(redirect)
        }
    }, [isAuthenticated])
    useEffect(() => {
        if (success) {
            toast.success("Login Successful", { position: 'top-center', autoClose: 2000 });
            dispatch(removeSuccess())
        }
    }, [dispatch, success])
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-sm rounded-2xl border-2 border-white/10 p-7">
                <h1 className="text-3xl text-center mb-7">Login</h1>
                <form className="space-y-4" onSubmit={loginSubmit}>
                    <div className="input-group">
                        <label className="text-md">E-Mail</label>
                        <input className="mt-2 w-full rounded-2xl border border-teal-700 p-3 focus:outline-none focus:border-blue-500 hover:bg-gray-700/40 focus:ring-1 focus:ring-indigo-500" type="email" placeholder='Enter your email' value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label className="text-md">Password</label>
                        <div className="relative mt-2">
                            <input type={showPassword ? "text" : "password"} className="w-full rounded-2xl border border-teal-700 p-3 focus:outline-none focus:border-blue-500 hover:bg-gray-700/40 focus:ring-1 focus:ring-indigo-500" placeholder='Enter Password' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
                            >
                                {showPassword ? (
                                    <VisibilityOffIcon fontSize="small" />
                                ) : (
                                    <VisibilityIcon fontSize="small" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button className="w-full p-2 rounded-2xl bg-teal-700 hover:bg-teal-800 transition">Login</button>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                        <div className="flex-1 h-px bg-gray-500" />
                        Or
                        <div className="flex-1 h-px bg-gray-500" />
                    </div>
                    <button
                        type="button"
                        //   onClick={signInWithGoogle}
                        className="mt-4 w-full flex items-center justify-center gap-3
             rounded-2xl border border-gray-700 py-2
             text-sm text-white hover:bg-gray-700 transition"
                    >
                        <GoogleIcon fontSize="small" />
                        Login with Google
                    </button>
                </form>
                <div className="mt-4 flex justify-center text-sm text-gray-300">
                    Forgot password?
                    <Link to="/password/forgot" className="text-blue-700 hover:underline hover:text-indigo-700">
                        Reset
                    </Link>
                </div>
                <div className="mt-4 text-center text-sm text-gray-300">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-700 hover:underline hover:text-indigo-700">
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login