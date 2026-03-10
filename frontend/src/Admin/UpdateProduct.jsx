import { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PageTitle from '../components/PageTitle'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProductDetails } from '../features/products/productSlice';
import { removeErrors, removeSuccess, updateProduct } from '../features/admin/adminSlice';

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [image, setImage] = useState([]);
    const [oldImage, setOldImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const { product } = useSelector(state => state.product);
    const { success, loading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateId } = useParams();
    const categories = ["Electronics", "Mobile phones", "Laptops and computers", "Tablets", "Smart watches", "Fashion", "Men clothing", "Women clothing",
        "Kids wear", "Bags and wallets", "Home and Kitchen", "Furniture", "Home decor", "Lighting", "Kitchen appliances", "Beauty and Personal Care", "Grocery and Daily Essentials",
        "Sports and Fitness", "Books and Stationery", "Toys and Games", "Automotive", "Health and Wellness", "Baby and Kids", "Pets", "Industrial and Tools", "Digital Products"];
    useEffect(() => {
        dispatch(getProductDetails(updateId));
    }, [dispatch, updateId])
    useEffect(() => {
        if (product) {
            setName(product.name)
            setPrice(product.price)
            setDescription(product.description)
            setCategory(product.category)
            setStock(product.stock)
            setOldImage(product.image)
        }
    }, [product])
    const handleImageChange = (e) => {
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
    const updateProductSubmit = (e) => {
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
        dispatch(updateProduct({ id: updateId, formData: myForm }))
    }
    useEffect(() => {
        if (error) {
            toast.error(error, { position: 'top-center', autoClose: 3000 });
            dispatch(removeErrors())
        }
        if (success) {
            toast.success("Product updated successful", { position: 'top-center', autoClose: 3000 });
            dispatch(removeSuccess())
            navigate('/admin/products')
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
            <PageTitle title="Update Product" />
            <div className="min-h-screen bg-gray-900 flex items-center justify-center mt-16 px-4 py-10">
                <div className="w-full max-w-3xl bg-gray-900/50 border border-gray-700 rounded-xl shadow-xl p-6">
                    <h1 className="text-2xl font-semibold text-white text-center mb-6">
                        Update Product
                    </h1>
                    <form className="space-y-4" onSubmit={updateProductSubmit} encType='multipart/form-data'>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="name">Product Name</label>
                            <input type="text" className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={name} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='Enter product name' />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="price">Product Price</label>
                            <input type="number" className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={price} onChange={(e) => setPrice(e.target.value)} name='price' id='price' placeholder='Enter product price' />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="description">Product Description</label>
                            <textarea rows={4} type="text" className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={description} onChange={(e) => setDescription(e.target.value)} name='description' id='description' placeholder='Enter product description' />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="category">Select Category</label>
                            <select className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={category} onChange={(e) => setCategory(e.target.value)} name="category" id="category">
                                <option value="">Choose a category</option>
                                {categories.map((item) => (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="stock">Product Stock</label>
                            <input type="number" className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                value={stock} onChange={(e) => setStock(e.target.value)} name='stock' id='stock' placeholder='Enter product stock' />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400" htmlFor="image">Upload Image</label>
                            <input type="file" accept='image/' onChange={handleImageChange} multiple className="mt-2 w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0
                            file:bg-indigo-600 file:text-white hover:file:bg-indigo-700" name='image' id="image" />
                        </div>
                        <div className="flex gap-3 flex-wrap mt-3">
                            {imagePreview.map((img, index) => (
                                <img src={img} key={index} className="w-16 h-16 rounded-lg object-cover border border-gray-700" alt="g" />
                            ))}
                        </div>
                        <div className="flex gap-3 flex-wrap mt-3">
                            {oldImage.map((img, index) => (
                                <img src={img.url} key={index} alt={img.name} className="w-16 h-16 rounded-lg object-cover border border-gray-700 opacity-70" />
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white disabled:opacity-50">
                            {loading ? "Updating..." : "Update Product"}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default UpdateProduct