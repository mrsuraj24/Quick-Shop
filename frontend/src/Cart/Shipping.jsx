import { useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CheckoutPath from './CheckoutPath';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State, City } from 'country-state-city';
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

function Shipping() {
    const { shippingInfo } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [address, setAddress] = useState(shippingInfo.address || "");
    const [pincode, setPincode] = useState(shippingInfo.pincode || "");
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber || "");
    const [country, setCountry] = useState(shippingInfo.country || "");
    const [state, setState] = useState(shippingInfo.state || "");
    const [city, setCity] = useState(shippingInfo.city || "");
    const navigate = useNavigate()
    const shippingInfoSubmit = (e) => {
        e.preventDefault();
        if (phoneNumber.length !== 10) {
            toast.error('Invalid Phone Number ! It should be 10 digits', { position: 'top-center', autoClose: 3000 })
            return;
        }
        dispatch(saveShippingInfo({ address, pincode, phoneNumber, country, state, city }))
        navigate('/order/confirm')
    }
    return (
        <>
            <Navbar />
            <PageTitle title="Shipping Information" />
            <CheckoutPath activePath={0} />
            <div className="min-h-screen bg-gray-900/90 flex items-center justify-center px-4 py-10 text-white">
                <div className="w-full max-w-3xl rounded-xl bg-gray-900/50 p-6 sm:p-8 shadow-2xl">
                    <h1 className="text-3xl text-white font-bold text-center mb-8">Shipping Details</h1>
                    <form className="space-y-6" onSubmit={shippingInfoSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-3">
                                <label className="block text-sm mb-1">Address</label>
                                <input className="w-full rounded-xl border border-gray-700 bg-transparent px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:bg-gray-800"
                                    type="text" id='address' name='address' placeholder='Enter your address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Pincode</label>
                                <input className="w-full rounded-xl border border-gray-700 bg-transparent px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:bg-gray-800"
                                    type="number" id='pincode' name='pincode' placeholder='Enter your pincode' value={pincode} onChange={(e) => setPincode(e.target.value)} />
                            </div>
                            <div className="shipping-form-group">
                                <label className="block text-sm mb-1">Phone No.</label>
                                <input className="w-full rounded-xl border border-gray-700 bg-transparent px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:bg-gray-800"
                                    type="tel" id='phoneNumber' name='phoneNumber' placeholder='Enter phone number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Country</label>
                                <select name="country" id="country" value={country} onChange={(e) => {
                                    setCountry(e.target.value)
                                    setState("");
                                    setCity("")
                                }} className="w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                                    <option value="">Select Country</option>
                                    {Country && Country.getAllCountries().map((item) => (
                                        <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                            {country && <div className="shipping-form-group">
                                <label className="block text-sm mb-1">State</label>
                                <select name="state" id="state" value={state} onChange={(e) => {
                                    setState(e.target.value)
                                    setCity("")
                                }} className="w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                                    <option value="">Select State</option>
                                    {State && State.getStatesOfCountry(country).map((item) => (
                                        <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>}
                            {state && <div>
                                <label className="block text-sm mb-1">City</label>
                                <select name="city" id="city" value={city} onChange={(e) => setCity(e.target.value)}
                                    className="w-full rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                                    <option value="">Select City</option>
                                    {City && City.getCitiesOfState(country, state).map((item) => (
                                        <option value={item.name} key={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>}
                        </div>
                        <button type="submit" className="w-full mt-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-medium">
                            Continue
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Shipping