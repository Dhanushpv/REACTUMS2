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
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    // Fetch user types on component mount
    useEffect(() => {
        const fetchUserTypes = async () => {
            try {
                let response = await fetch('http://localhost:3000/getUsertypes', {
                    method: 'GET',
                });
                if (!response.ok) throw new Error('Failed to fetch user types');
                let parsed_data = await response.json();
                setUserTypes(parsed_data.data);
            } catch (error) {
                setErrorMessage('Error fetching user types. Please try again later.');
                console.error(error);
            }
        };

        // Fetch user data on component mount
        const fetchUserData = async () => {
            let params = new URLSearchParams(window.location.search);
            let id = params.get('id');
            let token_key = params.get('login');
            let token = localStorage.getItem(token_key);

            if (!token) {
                setErrorMessage('Token not found, please log in again.');
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
                if (!response.ok) throw new Error('Failed to fetch user data');

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
                setErrorMessage('Error fetching user data. Please try again later.');
                console.error(error);
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
        setErrorMessage(''); // Clear any previous error messages

        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        if (!token) {
            setErrorMessage('Token not found, please log in again.');
            setLoading(false);
            return;
        }

        let data = {
            name: userData.name,
            email: userData.email,
            phoneno: userData.phoneno,
            usertype: userData.usertype,
        };

        if (userData.password) {
            data.password = userData.password; // Include password only if provided
        }

        let strdata = JSON.stringify(data);

        try {
            let response = await fetch(`http://localhost:3000/singleUpdate/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: strdata,
            });

            let parsed_response = await response.json();

            if (response.status === 200) {
                alert('Employee successfully updated.');
                navigate(`/Admin?login=${token}&id=${id}`);
            } else {
                setErrorMessage('Update failed. Please check the details.');
            }
        } catch (error) {
            console.log('Error:', error);
            setErrorMessage('An error occurred while updating. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className='bg-white updateMaincontainer'>
            <div className=''>
            <nav className="p-3 update_nav">
                <div className="d-flex justify-content-between align-items-center container">
                    <div>
                        <img
                            src="https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000"
                            style={{ width: 70, height: 70, zIndex: 1 }}
                            alt=""
                        />
                        <span className="fs-3 text-center fw-bold text-white p-2">
                            UMS
                        </span>
                    </div>
                    <div>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="/admin">
                                Home
                            </a>
                        </span>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="">
                                File
                            </a>
                        </span>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="">
                                About
                            </a>
                        </span>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="">
                                Contact
                            </a>
                        </span>
                        <button className="ad_bttn2">SIGN IN</button>
                        <span className="px-4">
                            <img
                                src="https://img.icons8.com/?size=100&id=STOBCZbtLToI&format=png&color=000000"
                                style={{ width: 50, height: 50 }}
                                alt=""
                            />
                        </span>
                    </div>
                </div>
            </nav>
            </div>

            <div className='UpdateContainer1'>

            <div className=" UpdateContainer2  ">
                <form
                    onSubmit={updateLoadDatas}
                    className=" UpdateFormContainer "
                >
                    <h1 className="fw-bold text-center ">UPDATE USER</h1>

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

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
                                className="input usertype"
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
        </div>
    );
}

export default UpdateUser
