import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer"
import Loader from '../components/Loader';
import { logout } from '../features/user/userslice';


function Profile() {
    const { loading, isAuthenticated, user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout());
        navigate("/login");
    };
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
    }, [isAuthenticated])
    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <Navbar />
                    <PageTitle title={`${user.name} Profile`} />
                    <div className="min-h-179 bg-black text-white px-4 py-10 mt-16">
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="rounded-xl shadow-2xl p-6 text-center border border-white/10">
                                <img src={user.avatar.url ? user.avatar.url : './public/logo.png'} alt="User Profile" className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-indigo-600" />
                                <h2 className="mt-4 text-xl font-semibold">
                                    {user.name}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    {user.email}
                                </p>
                                <div className="flex justify-center gap-7 mt-5">
                                    <Link to={"/profile/update"} className="p-3 text-sm text-center rounded-2xl bg-teal-700 hover:bg-teal-800 transition">
                                        Edit Profile
                                    </Link>
                                    <Link to={"/password/update"} className="p-3 text-sm text-center rounded-2xl bg-teal-700 hover:bg-teal-800 transition">
                                        Change Password
                                    </Link>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div className="rounded-xl shadow-2xl p-6 border border-white/10">
                                    <h3 className="text-lg font-semibold mb-4 text-indigo-400">
                                        Account Details
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-400">Username</p>
                                            <p className="font-medium">{user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Email</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">Joined On</p>
                                            <p className="font-medium">
                                                {user.createdAt ? String(user.createdAt).substring(0, 10) : 'NA'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={logoutHandler} className="w-full p-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition font-medium">
                                Logout
                            </button>
                        </div >
                    </div >
                    <Footer />
                </>)}
        </>
    )
}

export default Profile