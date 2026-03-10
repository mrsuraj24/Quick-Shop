import { useEffect } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PageTitle from '../components/PageTitle'
import { Link, useNavigate } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { clearMessage, deleteUser, fetchUsers, removeErrors } from '../features/admin/adminSlice'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

function UsersList() {
    const { users, loading, error, message } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    const handleDelete = (userId) => {
        const confirm = window.confirm("Are you sure! You want to delete this profile?")
        if (confirm) {
            dispatch(deleteUser(userId))
        }
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (message) {
            toast.success(message, { position: 'top-center', autoClose: 3000 });
            dispatch(clearMessage())
            navigate('/admin/dashboard')
        }
    }, [dispatch, message, error])
    return (
        <>
            {loading ? (<Loader />) : (<>
                <Navbar />
                <PageTitle title="All Users" />
                <div className="min-h-screen bg-gray-900 text-white mt-16 p-4 md:p-6">
                    <h1 className="text-2xl font-semibold text-center mb-6">All Users</h1>
                    <div className="hidden md:block overflow-x-auto bg-gray-900/50 border border-gray-700 rounded-xl">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-800 text-gray-200">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Avatar</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Role</th>
                                    <th className="p-3 text-left">Created</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-800">
                                        <td className="p-3 text-gray-300">{index + 1}</td>
                                        <td className="p-3 text-gray-300">
                                            <img src={user.avatar?.url} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                                        </td>
                                        <td className="p-3 text-gray-300">{user.name}</td>
                                        <td className="p-3 text-gray-300">{user.email}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${user.role === "admin" ? "bg-indigo-600/20 text-indigo-400"
                                                : "bg-green-600/20 text-green-400"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3 flex gap-2">
                                            <Link to={`/admin/user/${user._id}`} className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-700"><Edit fontSize="small" /></Link>
                                            <button onClick={() => handleDelete(user._id)} className="p-2 rounded-lg bg-red-600 hover:bg-red-700"><Delete fontSize="small" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="md:hidden space-y-4">
                        {users.map((user) => (
                            <div key={user._id} className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <img src={user.avatar?.url} alt={user.name} className="w-12 h-12 rounded-full object-cover border border-gray-700" />
                                    <div>
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs text-gray-400">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm mb-3">
                                    <span className={`px-2 py-1 rounded text-xs ${user.role === "admin" ? "bg-indigo-600/20 text-indigo-400" : "bg-green-600/20 text-green-400"}`}>
                                        {user.role}
                                    </span>
                                    <span className="text-gray-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <Link to={`/admin/user/${user._id}`} className="flex-1 text-center py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700">
                                        Edit
                                    </Link>
                                    <button onClick={() => handleDelete(user._id)} className="flex-1 py-2 rounded-lg bg-red-600 hover:bg-red-700">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Footer />
            </>
            )}
        </>
    )
}

export default UsersList