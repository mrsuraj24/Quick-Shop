import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

export default function PageNotFound() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
                <div className="max-w-md w-full text-center bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-10 shadow-2xl">
                    <h1 className="text-[110px] font-extrabold text-indigo-500 leading-none">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-white mt-2">
                        Page not found
                    </h2>
                    <p className="text-gray-400 mt-3 mb-8">
                        The page you are trying to open does not exist or has been moved.
                    </p>
                    <button onClick={() => navigate("/")} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition shadow-lg">
                        Go back to Home
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}