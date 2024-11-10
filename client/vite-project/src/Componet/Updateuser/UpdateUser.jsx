import { useState, useEffect } from 'react';

function UpdateUser() {
    const [userTypes, setUserTypes] = useState([]); // State for user types
    const [userType, setUserType] = useState(''); // State for selected user type

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
        fetchUserTypes();
    }, []); // Empty dependency array ensures it runs once on mount

    const updateLoadDatas = async (event) => {
        event.preventDefault(); // Prevent form submission from refreshing the page

        let params = new URLSearchParams(window.location.search);
        let id = params.get('id');
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

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

            // Update form fields with fetched data
            document.getElementById('name').value = data.name;
            document.getElementById('email').value = data.email;
            document.getElementById('phoneno').value = data.phoneno;
            document.getElementById('password').value = data.password;
            setUserType(data.usertype); // Update the selected user type
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div>
            <div className="shadow-lg p-3 mb-5 login position-absolute top-50 end-0 translate-middle-y">
                <form
                    onSubmit={updateLoadDatas}
                    className="d-flex justify-content-center align-items-center flex-column"
                >
                    <h1 className="fw-bold text-center pt-5">ADD UPDATE</h1>

                    <div className="pt-4 text-white d-flex justify-content-center align-items-center">
                        <label htmlFor="name">Name</label>
                        <div className="types">
                            <input
                                type="text"
                                className="rounded p-2 usertypes fw-bold text-dark"
                                name="username"
                                id="name"
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
                            />
                        </div>
                    </div>

                    <div className="pt-5 usertypes-main">
                        <label>
                            <select
                                className="input"
                                id="selection_container"
                                value={userType} // Controlled input
                                onChange={(e) => setUserType(e.target.value)} // Updates the state
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
                            value="UPDATE"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
