'use client'

import { Controller, Form, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Eye, EyeOff, Plus } from 'lucide-react';
import { UserService } from '@/service/user/user.service';
import { toast } from 'react-toastify';
import { Country, State, City } from 'country-state-city';
import { StaticImageData } from 'next/image';
import Image from 'next/image';

export default function page() {
    const { handleSubmit, formState: { errors } } = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState<string | FileList>();
    const [adminInfo, setAdminInfo] = useState({
        name: "",
        email: "",
        phone_number: "",
        date_of_birth: "",
        country: "",
        state: "",
        city: "",
        address: "",
        zip_code: "",
        avatar_url: ""
    })

    // token extract helper
    const getCookieToken = () => {
        if (typeof document === "undefined") return null;

        const cookieString = document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith("empdashtoken="));
        return cookieString?.split("=")[1] || null;
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };
    const togglePasswordVisibility2 = () => {
        setShowPassword2(prevState => !prevState);
    };

    const onSubmit = async () => {
        const adminData = {
            ...(avatar && { image: avatar[0] }),
            ...(adminInfo.name && { name: adminInfo.name }),
            ...(adminInfo.email && { email: adminInfo.email }),
            ...(adminInfo.phone_number && { phone_number: adminInfo.phone_number }),
            ...(adminInfo.date_of_birth && { date_of_birth: adminInfo.date_of_birth.split("T")[0] }),
            ...(selectedCountry && { country: selectedCountry }),
            ...(selectedState && { state: selectedState }),
            ...(selectedCity && { city: selectedCity }),
            ...(adminInfo.address && { address: adminInfo.address }),
            ...(adminInfo.zip_code && { zip_code: adminInfo.zip_code }),
            ...(password && { password: password }),
        }
        try {
            setLoading(true)
            const res = await UserService?.updateAdminProfile(adminData);

            if (res?.data?.success) {
                toast.success(res.data.message);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Registration failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const token = getCookieToken();
        const getProfileInfo = async () => {
            try {
                setLoading(true)
                const res = await UserService?.getProfile();
                if (res?.data?.success) {
                    setAdminInfo(res.data.data)
                    setSelectedCountry(adminInfo.country || "")
                    setSelectedState(adminInfo.state || "")
                    setSelectedCity(adminInfo.city || "")
                    setAvatar(adminInfo.avatar_url)
                } else {
                    toast.error(res?.response?.data?.message || "Failed to fetch data");
                }
            } catch (error: any) {
                toast.error(
                    error.response?.data?.message ||
                    error.message ||
                    "An error occurred while fetching data"
                );
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        if (token)
            getProfileInfo();
    }, [])


    const handleChange = (key: string, value: string) => {
        setAdminInfo(prev => ({ ...prev, [key]: value }))
    }


    // Get all countries
    const countries = Country.getAllCountries();

    // Get states for selected country
    const states = State.getStatesOfCountry(selectedCountry);

    // Get cities for selected country and state
    const cities = City.getCitiesOfState(selectedCountry, selectedState);

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setSelectedCity('');
    };

    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = URL.createObjectURL(e.target.files[0]);
            setAvatar(e.target.files);
        }
    };

    return (
        <div className='p-8 bg-white rounded-2xl outline-1 outline-offset-[-1px] outline-indigo-50  flex flex-col justify-center  gap-12'>
            {loading && <div className='font-semibold text-xl'>Loading...</div>}
            {!loading && <form className=' flex flex-col gap-8' onSubmit={handleSubmit(onSubmit)}>
                <div className="w-20 aspect-square bg-slate-100 rounded-full relative" >
                    {(avatar || adminInfo.avatar_url) && <Image
                        src={avatar[0] instanceof File ? URL.createObjectURL(avatar[0]) : adminInfo.avatar_url}
                        alt="Upload"
                        width={100}
                        height={100}
                        className="rounded-full object-cover max-h-full max-w-full"
                    />
                    }
                    <div className='absolute bottom-[2px] right-[2px] bg-sky-300 text-white rounded-full hover:bg-sky-300/70'>
                        <label htmlFor="avatar">
                            <Plus className='stroke-3  ' />
                        </label>
                        <input type="file" name="avatar" id="avatar" accept="image/*" onChange={handleFileChange} hidden />
                    </div>
                </div>
                <div className='   flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label htmlFor='name' className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                            value={adminInfo?.name || ""}
                            onChange={(e) => handleChange("name", e.target.value)}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                            value={adminInfo?.email || ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full  flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Phone No*
                        </label>
                        <input
                            type="text"
                            id="PhoneNo"
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                            value={adminInfo?.phone_number || ""}
                            onChange={(e) => handleChange("phone_number", e.target.value)}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Date of Birth*
                        </label>
                        <input
                            type="date"
                            id="DateOfBirth"
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                            value={adminInfo?.date_of_birth?.split("T")[0] || ""}
                            onChange={(e) => handleChange("date_of_birth", e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full  flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Country*
                        </label>
                        <select
                            id="country"
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            State*
                        </label>
                        <select
                            id="state"
                            value={selectedState}
                            onChange={handleStateChange}
                            disabled={!selectedCountry}
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                        >
                            <option value="">Select State</option>
                            {states.map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* city address zip */}
                <div className='w-full  flex flex-col sm:flex-row gap-4'>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            City*
                        </label>
                        <select
                            id="city"
                            value={selectedCity}
                            onChange={handleCityChange}
                            disabled={!selectedState}
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Address*
                        </label>
                        <input
                            type="text"
                            id="Address"
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                            value={adminInfo?.address || ""}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </div>
                    <div className='relative w-full flex flex-col gap-2'>
                        <label className="absolute left-4 -top-3.5 bg-white z-100  px-2.5  justify-start text-neutral-800 text-base font-medium font-['Inter'] leading-relaxed">
                            Zip Code
                        </label>
                        <input
                            type="text"
                            id="zipCode"
                            className="h-14 px-4 py-4   rounded-lg   outline-1 outline-offset-[-1px] outline-gray-200"
                            value={adminInfo?.zip_code || ""}
                            onChange={(e) => handleChange("zip_code", e.target.value)}
                        />
                    </div>
                </div>
                {/* paasword */}
                <div className='w-full flex flex-col sm:flex-row gap-4'>
                    <div className="w-full flex flex-col gap-2.5">
                        <label
                            htmlFor="password"
                            className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug"
                        >
                            Password
                        </label>
                        <div className="flex items-center outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="px-5 py-4 w-full outline-0"
                                value={password}
                                onChange={(e) => setPassword(e.currentTarget.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="p-2 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                        <label
                            htmlFor="passwordConfirm"
                            className="text-neutral-800 text-sm font-medium font-['Urbanist'] leading-snug"
                        >
                            Confirm Password
                        </label>
                        <div className="flex items-center outline-1 outline-offset-[-1px] outline-gray-200 rounded-xl">
                            <input
                                id="passwordConfirm"
                                type={showPassword2 ? "text" : "password"}
                                placeholder="Enter your password"
                                className="px-5 py-4 w-full  outline-0 "
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility2}
                                className="p-2 cursor-pointer"
                            >
                                {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                </div>
                <button
                    type="submit"
                    className="w-fit cursor-pointer h-12 px-6  bg-sky-300 hover:bg-sky-300/70 rounded-md  text-white text-sm font-medium font-['Urbanist'] leading-relaxed"
                >
                    Save Changes
                </button>

            </form>}
        </div>
    )
}