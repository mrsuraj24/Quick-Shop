import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess, resetPassword } from '../features/user/userslice';
import { toast } from 'react-toastify';
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

function ResetPassword() {
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { token } = useParams()
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const data = {
            password,
            confirmPassword,
        }
        dispatch(resetPassword({ token, userData: data }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success("Password reset successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            navigate("/login")
        }
    }, [dispatch, success, navigate])
    return (
        <>
            <PageTitle title="Reset Password" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900/90 text-white px-4">
                <div className="w-full max-w-sm rounded-xl bg-gray-900/50 p-6 shadow-2xl">
                    <h1 className="text-4xl text-center font-bold mb-8">
                        Reset Password
                    </h1>
                    <form className="space-y-4" onSubmit={resetPasswordSubmit}>
                        <div className="input-group">
                            <label className="text-md">New Password</label>
                            <div className="relative mt-1">
                                <input type={showPassword ? "text" : "password"} className="w-full rounded-xl border border-gray-700 px-3 py-2 pr-10 text-sm text-white
                  placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" name='password' placeholder='Enter new password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white">
                                    {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                </button>
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="text-md">Confirm Password</label>
                            <div className="relative mt-1">
                                <input type={showConfirm ? "text" : "password"} className="w-full rounded-xl border border-gray-700 px-3 py-2 pr-10 text-sm text-white
                  placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" name='confirmPassword' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white">
                                    {showConfirm ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                </button>
                            </div>
                        </div>
                        <button disabled={loading} className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white disabled:opacity-60">
                            {loading ? "Updating..." : "Reset Password"}
                        </button>
                    </form>
                    <div className="mt-5 text-center text-sm text-gray-300">
                        Remembered your password?{" "}
                        <span onClick={() => navigate("/login")} className="text-indigo-600 hover:underline cursor-pointer">
                            Login
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword