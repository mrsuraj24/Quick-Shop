import { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, removeErrors, removeSuccess, updateUserRole } from '../features/admin/adminSlice';
import { toast } from 'react-toastify';

function UpdateRole() {
    const { userId } = useParams();
    const { user, success, loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: ""
    });
    const { name, email, role } = formData;
    useEffect(() => {
        dispatch(getSingleUser(userId))
    }, [])
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                role: user.role || ""
            })
        }
    }, [user])
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserRole({ userId, role }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error.message, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (success) {
            toast.success("Role updated successfully", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            navigate('/admin/users')
        }
    }, [dispatch, error, success])
    return (
        <>
            <Navbar />
            <PageTitle title="Update Role" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                <div className="w-full max-w-md bg-gray-900/50 border border-gray-700 rounded-xl shadow-xl p-6">
                    <h1 className="text-2xl font-semibold text-white text-center mb-6">
                        Update User Role
                    </h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-sm text-gray-400">Name</label>
                            <input type="text" id='name' name='name' value={name} readOnly className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-400 cursor-not-allowed" />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                            <input type="email" id='email' name='email' value={email} readOnly className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-400 cursor-not-allowed" />
                        </div>
                        <div>
                            <label htmlFor="role" className="text-sm text-gray-400">Role</label>
                            <select name="role" id="role" onChange={handleChange} required value={role} className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                                <option value="">Select role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white">
                            Update role
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UpdateRole