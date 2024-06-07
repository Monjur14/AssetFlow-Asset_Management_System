/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import UseAuth from '../CustomHook/UseAuth';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoinAsAdmin = () => {
	const navigate = useNavigate()
    const [show, setShow] = useState(false)
	const toggleShow = () => {
		setShow(!show)
	}
    useEffect(() => {
        document.title = 'Registration Page';
        return () => {
          document.title = 'Title';
        };
      }, []);

	  function isPasswordValid(password) {		
		const uppercaseRegex = /[A-Z]/;
		const lowercaseRegex = /[a-z]/;
		return (
		  password.length >= 6 &&
		  uppercaseRegex.test(password) &&
		  lowercaseRegex.test(password)
		);
	  }
	  const notify = () => toast.error("Password should have 1 uppercase letter, 1 lowercase letter and 6 character long");
	  const { createUser, updateUserProfile, googleLogin } = UseAuth()
	  const {
		register,
		handleSubmit,
		formState: { errors }, 
	  } = useForm()
	  const onSubmit = (data) => {
		const {email, password, name, companyName, companyLogo, dateofbirth, packages} = data
		const addUser = {
			email,
			role: "Admin",
			name,
			companyName: companyName,
			companyLogo,
			dateofbirth,
			packages,
			affiliateWith: companyName
		}
		if(isPasswordValid(password)){
			createUser(email, password)
		.then((result) => {
			updateUserProfile(name, image)
			.then(() => {
				// toast.success("Successfully Login")
				navigate("/")
			})
			
		})
		} else {
			notify()
		}
		fetch("http://localhost:5000/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(addUser)
			})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Failed to Login: ${res.status} ${res.statusText}`);
				}
				return res.json();
			})
			.then((data) => {
				console.log(data)
				if(data.insertedId){
					toast.success("Successfully Login");
				}
			})
			.catch(error => {
				console.error('Error adding job:', error);
				toast.error("Failed to Login");
			});
	  }
  return (
<div className='w-full h-full bg2'>
<div className='w-full mx-auto max-w-md p-4 rounded-md  sm:p-8'>
      <form noValidate="" action="" className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
		<div className="space-y-4">
			<div className="space-y-2">
				<label htmlFor="name" className="block text-sm">Name</label>
				<input type="text" name="name" id="name" placeholder="Your Name" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("name", { required: true })}/>
				{errors.name && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm">Email address</label>
				<input type="email" name="email" id="email" placeholder="youremail@gmail.com" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("email", { required: true })}/>
				{errors.email && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="companyName" className="block text-sm">Company Name</label>
				<input type="text" name="companyName" id="companyName" placeholder="Your Company Name" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("companyName", { required: true })}/>
				{errors.companyName && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="companyLogo" className="block text-sm">Company Logo</label>
				<input type="url" name="companyLogo" id="companyLogo" placeholder="Your Company Logo" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("companyLogo", { required: false })}/>
				{errors.companyLogo && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="dateofbirth" className="block text-sm">Date of Birth</label>
				<input type="date" name="dateofbirth" id="dateofbirth" placeholder="Date of Birth" className="w-full bg-transparent px-3 py-2 border border-black rounded-md" {...register("dateofbirth", { required: true })}/>
				{errors.dateofbirth && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<label htmlFor="packages" className="block text-sm">Your Package</label>
				<select name="packages" id="packages" className="w-full px-3 bg-transparent py-2 border border-black rounded-md" {...register("packages", { required: true })}>
					<option value="">Select Your Package</option>
					<option value="5">5 Members for $5</option>
					<option value="10">10 Members for $8</option>
					<option value="20">20 Members for $15</option>
				</select>
				{errors.packages && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
			<div className="space-y-2">
				<div className="flex justify-between">
					<label htmlFor="password" className="text-sm">Password</label>
				</div>
				<div className='w-full px-3 py-2 border border-black rounded-md flex  justify-between items-center'>
					<input type={show ? "text" : "password"} name="password" id="password" placeholder="*****" className="w-full bg-transparent outline-none" {...register("password", { required: true })}/>					
					{show ? <IoEyeOutline className='text-xl cursor-pointer' onClick={toggleShow}/> : <IoEyeOffOutline className='text-xl cursor-pointer' onClick={toggleShow}/>}
					</div>
				{errors.password && <span className='text-sm text-red-600 font-semibold'>This field is required</span>}
			</div>
		</div>
		<button type="submit" className="w-full mt-5 px-8 py-3 font-semibold rounded-md bg-purple text-white">Sign Up</button>
	</form>
    <p className="text-md text-center mt-3">Already have account?
		<Link to={"/login"} rel="noopener noreferrer" className="focus:underline hover:underline font-semibold"> Sign In here</Link>
	</p>
	<ToastContainer />
    </div>
</div>
  )
}

export default JoinAsAdmin
