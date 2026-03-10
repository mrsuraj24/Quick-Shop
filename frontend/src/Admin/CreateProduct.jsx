import { useEffect, useState } from "react"
import PageTitle from "../components/PageTitle"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, removeErrors, removeSuccess } from "../features/admin/adminSlice";
import { toast } from "react-toastify";

function CreateProduct() {
    const { success, loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);

    const categories = ["Electronics", "Cloths", "Bags and wallets", "Home and Kitchen", "Furniture", "Home decor", "Lighting", "Kitchen appliances", "Beauty and Personal Care", "Grocery and Daily Essentials",
        "Sports and Fitness", "Books and Stationery", "Toys and Games", "Automotive", "Health and Wellness", "Baby and Kids", "Industrial and Tools", "Digital Products"];
    const createProductSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('stock', stock);
        image.forEach((img) => {
            myForm.append('image', img)
        })
        dispatch(createProduct(myForm))
    }
    const createProductImage = (e) => {
        const files = Array.from(e.target.files)
        setImage([]);
        setImagePreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview((old) => [...old, reader.result]);
                    setImage((old) => [...old, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (success) {
            toast.success("Product created successful", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            setName("");
            setPrice("");
            setDescription("");
            setCategory("");
            setStock("");
            setImage([]);
            setImagePreview([]);
        }
    }, [dispatch, success, error])
    return (
        <>
            <Navbar />
            <PageTitle title="Create Product" />
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white mt-16">
                <div className="w-full max-w-sm rounded-2xl border border-white/10 p-7">
                    <h1 className="text-3xl text-center font-bold mb-6">Create Product</h1>
                    <form className="space-y-4" encType="multipart/form-data" onSubmit={createProductSubmit}>
                        <div>
                            <label className="text-md">Product Name</label>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter product name"
                                className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" required />
                        </div>
                        <div>
                            <label className="text-md">Price</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter product price"
                                className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" name="price" required />
                        </div>
                        <div>
                            <label className="text-md">Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="description" placeholder="Enter product Description"
                                className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" required />
                        </div>
                        <div>
                            <label className="text-md">Category</label>
                            <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white bg-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" required>
                                <option value="">Choose a category</option>
                                {categories.map((item) => (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-md">Stock</label>
                            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} name="stock" placeholder="Enter product stock"
                                className="mt-1 w-full rounded-xl border border-gray-700 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 hover:bg-gray-600 focus:ring-1 focus:ring-indigo-500" required />
                        </div>
                        <div className="file-input-container">
                            <label className="text-md">Product Images</label>
                            <input type="file" onChange={createProductImage} accept="image/" className="mt-1 w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" multiple name="image" />
                        </div>
                        <div className="flex gap-2 flex-wrap mt-2">
                            {imagePreview.map((img, index) => (
                                <img src={img} alt="Product Preview" className="w-14 h-14 object-cover rounded-lg border border-gray-700" key={index} />
                            ))}
                        </div>
                        <button className="w-full py-2 rounded-xl bg-teal-700 hover:bg-teal-800 transition font-medium text-white">{loading ? "Creating..." : "Create Product"}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CreateProduct