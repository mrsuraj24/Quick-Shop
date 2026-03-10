import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from 'react-redux';
import { register, removeErrors, removeSuccess } from '../features/user/userslice';

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("")
    const { name, email, password } = user;
    const { success, loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const registerDataChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            toast.error("Please fill all the fields", { position: "top-center", autoClose: 4000 })
            return;
        }
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('email', email);
        myForm.set('password', password);
        myForm.set('avatar', avatar);
        console.log(myForm.entries());
        for (let pair of myForm.entries()) {
            console.log(pair[0] + ':' + pair[1]);
        }
        dispatch(register(myForm))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
    }, [dispatch, error])
    useEffect(() => {
        if (success) {
            toast.success("Registration Successful", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            navigate('/login')
        }
    }, [dispatch, success])

    return (<>
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
            <div className="w-full max-w-sm rounded-2xl border-2 border-white/10 p-7">
                <h1 className="text-3xl text-center mb-7">
                    Register
                </h1>
                <form className="space-y-4" onSubmit={registerSubmit} encType='multipart/form-data'>
                    <div className="input-group">
                        <label className="text-md">User Name</label>
                        <input className="mt-2 w-full rounded-2xl border border-teal-700 p-3 focus:outline-none focus:border-blue-700 hover:bg-gray-900 focus:ring-1 focus:ring-indigo-500" type="text" placeholder='Enter your name' name='name' value={name} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <label className="text-md">E-Mail</label>
                        <input className="mt-2 w-full rounded-2xl border border-teal-700 p-3 focus:outline-none focus:border-blue-700 hover:bg-gray-900 focus:ring-1 focus:ring-indigo-500" type="email" placeholder='Enter your email' name='email' value={email} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <label className="text-md">Password</label>
                        <input className="mt-2 w-full rounded-2xl border border-teal-700 p-3 focus:outline-none focus:border-blue-700 hover:bg-gray-900 focus:ring-1 focus:ring-indigo-500" type="password" placeholder='Create a password' name='password' value={password} onChange={registerDataChange} />
                    </div>
                    <div className="input-group">
                        <label className="text-md">Profile Photo</label>
                        <div className="mt-2 flex items-center gap-4">
                            <div
                                className="w-20 h-15 rounded-full border border-gray-700
                 flex items-center justify-center
                 bg-gray-800 text-gray-400
                 overflow-hidden"
                            >
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <PersonIcon fontSize="large" />
                                )}
                            </div>
                            <input className="mt-1 w-full text-sm text-gray-300
                     file:mr-3 file:py-2 file:px-4
                     file:rounded-xl file:border-0
                     file:bg-indigo-600 file:text-white
                     hover:file:bg-indigo-700 cursor-pointer" type="file" name='avatar' accept='image/*' onChange={registerDataChange} />

                        </div>
                    </div>
                    <button type="submit"
                        className="w-full p-3 rounded-2xl bg-teal-700 hover:bg-teal-800 transition">{loading ? "Please Wait..." : "Register"}</button>
                </form>
                <div className="mt-5 text-center text-sm text-gray-300">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-700 hover:underline hover:text-blue-800"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
}

export default Register