import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, removeErrors, removeSuccess } from '../features/user/userslice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { NavLink } from 'react-router-dom';

function ForgotPassword() {
    const { loading, error, success, message } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const forgotPasswordEmail = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('email', email)
        dispatch(forgotPassword(myForm))
        setEmail("");
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
        }
    }, [dispatch, success])
    return (
        <>
            {loading ? <Loader /> : (<>
                <Navbar />
                <PageTitle title="Forgot Password" />
                <div className="min-h-screen relative flex items-center justify-center flex-col bg-black text-white">
                    <div className="relative w-full max-w-sm border-2 border-white/10 rounded-xl p-7 animate-fade-up">
                        <h2 className="text-3xl text-center mb-7">
                            Forgot Password
                        </h2>
                        <p className="text-center text-gray-500 text-sm mb-6">
                            Enter your registered email. We’ll send you a reset link.
                        </p>
                        <form className="space-y-4" onSubmit={forgotPasswordEmail}>
                            <div className="input-group">
                                <label>Email address</label>
                                <input type="email" className="w-full my-2 p-3 text-md focus:border-blue-500 rounded-2xl border border-teal-700 focus:outline-none focus:ring-2 hover:bg-gray-900 focus:ring-indigo-500 transition" required placeholder='you@example.com' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <button type="submit" className="w-full py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 hover:opacity-90 transition">
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>

                            <div className="text-center">
                                <NavLink to="/login" className="text-semibold hover:underline text-blue-700 transition">
                                    ← Back to Login
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer />
            </>)}</>
    )
}

export default ForgotPassword