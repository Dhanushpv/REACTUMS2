// import { useState, useEffect } from 'react';

// function UpdateUser() {
//     const [userTypes, setUserTypes] = useState([]); // State for user types
//     const [userData, setUserData] = useState({
//         name: '',
//         email: '',
//         phoneno: '',
//         password: '',
//         usertype: ''
//     });

//     // Fetch user types on component mount
//     useEffect(() => {
//         const fetchUserTypes = async () => {
//             try {
//                 let response = await fetch('http://localhost:3000/getUsertypes', {
//                     method: 'GET',
//                 });
//                 let parsed_data = await response.json();
//                 setUserTypes(parsed_data.data);
//             } catch (error) {
//                 console.error('Error fetching user types:', error);
//             }
//         };

//         // Fetch user data on component mount
//         const fetchUserData = async () => {
//             let params = new URLSearchParams(window.location.search);
//             let id = params.get('id');
//             let token_key = params.get('login');
//             let token = localStorage.getItem(token_key);

//             if (!token) {
//                 console.error('Token not found');
//                 return;
//             }

//             try {
//                 let response = await fetch(`http://localhost:3000/users/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });

//                 let parsed_Response = await response.json();
//                 let data = parsed_Response.data;

//                 // Update state with fetched data
//                 setUserData({
//                     name: data.name,
//                     email: data.email,
//                     phoneno: data.phoneno,
//                     password: data.password,
//                     usertype: data.usertype,
//                 });
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserTypes();
//         fetchUserData();
//     }, []); // Empty dependency array ensures it runs once on mount

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const updateLoadDatas = async (event) => {
//         event.preventDefault();


//         let params = new URLSearchParams(window.location.search);
//         console.log('params', params);

//         let id = params.get('id');

//         let token_key = params.get('login');
//         console.log("token_key", token_key);

//         let token = localStorage.getItem(token_key);

//         let name = document.getElementById('name').value;
//         let email = document.getElementById('email').value;
//         let phoneno = document.getElementById('phoneno').value;
//         let password = document.getElementById('password').value;
//         let usertype = document.getElementById('usertype').value;

//         let data = {
//             name,
//             email,
//             phoneno,
//             password,
//             usertype
//         }

//         let strdata = JSON.stringify(data);

//         try {

//             let response = await fetch(`/singleUpdate/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     "Content-Type": "Application/json",
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: strdata,
//             });
//             console.log("responce :", response);

//             let parsed_response = await response.json();
//             console.log('parsed_response', parsed_response);


//             if (response.status === 200) {
//                 alert('Employee successfully Updated..');
//                 window.location = `admin.html?login=${token_key}`
//             } else {
//                 alert('Updation Failed')
//             }



//         } catch (error) {
//             console.log("error", error);
//         }


//     };

//     return (
//         <div>
//             <div className="shadow-lg p-3 mb-5 login position-absolute top-50 end-0 translate-middle-y">
//                 <form
//                     onSubmit={updateLoadDatas}
//                     className="d-flex justify-content-center align-items-center flex-column"
//                 >
//                     <h1 className="fw-bold text-center pt-5">ADD UPDATE</h1>

//                     <div className="pt-4 text-white d-flex justify-content-center align-items-center">
//                         <label htmlFor="name">Name</label>
//                         <div className="types">
//                             <input
//                                 type="text"
//                                 className="rounded p-2 usertypes fw-bold text-dark"
//                                 name="name"
//                                 id="name"
//                                 value={userData.name}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="pt-5 text-white d-flex justify-content-center align-items-center">
//                         <label htmlFor="email">Email</label>
//                         <div className="types1">
//                             <input
//                                 type="email"
//                                 className="rounded p-2 usertypes fw-bold text-dark"
//                                 name="email"
//                                 id="email"
//                                 value={userData.email}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="pt-5 text-white d-flex justify-content-center align-items-center">
//                         <label htmlFor="phoneno">Phone Number</label>
//                         <div className="types2">
//                             <input
//                                 type="number"
//                                 className="rounded p-2 usertypes fw-bold text-dark"
//                                 name="phoneno"
//                                 id="phoneno"
//                                 value={userData.phoneno}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="pt-5 text-white d-flex justify-content-center align-items-center">
//                         <label htmlFor="password">Password</label>
//                         <div className="types3">
//                             <input
//                                 type="password"
//                                 className="rounded p-2 usertypes fw-bold text-dark"
//                                 name="password"
//                                 id="password"
//                                 value={userData.password}
//                                 onChange={handleChange}
//                             />
//                         </div>
//                     </div>

//                     <div className="pt-5 usertypes-main">
//                         <label>
//                             <select
//                                 className="input"
//                                 id="selection_container"
//                                 name="usertype"
//                                 value={userData.usertype}
//                                 onChange={handleChange}
//                             >
//                                 <option value="" disabled>
//                                     Select Your Type
//                                 </option>
//                                 {userTypes.map((type, index) => (
//                                     <option key={index} value={type.user_type}>
//                                         {type.user_type}
//                                     </option>
//                                 ))}
//                             </select>
//                         </label>
//                     </div>

//                     <div className="pt-4 pb-4">
//                         <input
//                             type="submit"
//                             className="custom-btn btn-2"
//                             value="UPDATE"
//                         />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default UpdateUser;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function UpdateUser() {
    const navigate = useNavigate();
    const [userTypes, setUserTypes] = useState([]); // State for user types
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phoneno: '',
        password: '',
        usertype: ''
    });
    const [loading, setLoading] = useState(false); // Loading state for form submission

    // Fetch user types on component mount
    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                let response = await fetch('http://localhost:3000/getUsertypes', {
                    method: 'GET',
                });
                let parsed_data = await response.json();
                setUserTypes(parsed_data.data);
            } catch (error) {
                console.error('Error fetching user types:', error);
            }
        };

        // Fetch user data on component mount
        const fetchUserData = async () => {
            let params = new URLSearchParams(window.location.search);
            let id = params.get('id');
            let token_key = params.get('login');
            let token = localStorage.getItem(token_key);

            if (!token) {
                console.error('Token not found');
                return;
            }

            try {
                let response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                let parsed_Response = await response.json();
                let data = parsed_Response.data;

                // Update state with fetched data
                setUserData({
                    name: data.name,
                    email: data.email,
                    phoneno: data.phoneno,
                    password: '', // Keeping password blank for security reasons
                    usertype: data.usertype,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserTypes();
        fetchUserData();
    }, []); // Empty dependency array ensures it runs once on mount

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateLoadDatas = async (event) => {
        event.preventDefault();

        setLoading(true); // Set loading state to true

        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        if (!token) {
            console.error('Token not found');
            setLoading(false); // Stop loading
            return;
        }

        let data = {
            name: userData.name,
            email: userData.email,
            phoneno: userData.phoneno,
            password: userData.password, // Only update password if provided
            usertype: userData.usertype
        };

        let strdata = JSON.stringify(data);

        try {
            let response = await fetch(`http://localhost:3000/singleUpdate/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${token}`
                },
                body: strdata,
            });

            let parsed_response = await response.json();

            if (response.status === 200) {
                alert('Employee successfully updated.');
                navigate(`/Admin?login=${token}&id=${id}`)
            } else {
                alert('Update failed. Please check the details.');
            }
        } catch (error) {
            console.log('Error:', error);
            alert('An error occurred while updating. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div>
            <div className="shadow-lg p-3 mb-5 login position-absolute top-50 end-0 translate-middle-y">
                <form
                    onSubmit={updateLoadDatas}
                    className="d-flex justify-content-center align-items-center flex-column"
                >
                    <h1 className="fw-bold text-center pt-5">UPDATE USER</h1>

                    <div className="pt-4 text-white d-flex justify-content-center align-items-center">
                        <label htmlFor="name">Name</label>
                        <div className="types">
                            <input
                                type="text"
                                className="rounded p-2 usertypes fw-bold text-dark"
                                name="name"
                                id="name"
                                value={userData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="pt-5 text-white d-flex justify-content-center align-items-center">
                        <label htmlFor="email">Email</label>
                        <div className="types1">
                            <input
                                type="email"
                                className="rounded p-2 usertypes fw-bold text-dark"
                                name="email"
                                id="email"
                                value={userData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="pt-5 text-white d-flex justify-content-center align-items-center">
                        <label htmlFor="phoneno">Phone Number</label>
                        <div className="types2">
                            <input
                                type="number"
                                className="rounded p-2 usertypes fw-bold text-dark"
                                name="phoneno"
                                id="phoneno"
                                value={userData.phoneno}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="pt-5 text-white d-flex justify-content-center align-items-center">
                        <label htmlFor="password">Password</label>
                        <div className="types3">
                            <input
                                type="password"
                                className="rounded p-2 usertypes fw-bold text-dark"
                                name="password"
                                id="password"
                                value={userData.password}
                                onChange={handleChange}
                                placeholder="Enter new password if needed"
                            />
                        </div>
                    </div>

                    <div className="pt-5 usertypes-main">
                        <label>
                            <select
                                className="input"
                                id="selection_container"
                                name="usertype"
                                value={userData.usertype}
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select Your Type
                                </option>
                                {userTypes.map((type, index) => (
                                    <option key={index} value={type.user_type}>
                                        {type.user_type}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="pt-4 pb-4">
                        <input
                            type="submit"
                            className="custom-btn btn-2"
                            value={loading ? 'UPDATING...' : 'UPDATE'}
                            disabled={loading} // Disable button while loading
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
