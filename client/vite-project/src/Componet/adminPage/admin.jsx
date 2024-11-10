
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Admin() {
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let params = new URLSearchParams(window.location.search);
            console.log("params", params);

            let token_key = params.get("login");
            console.log("token_key", token_key);

            let token = localStorage.getItem(token_key);

            try {
                let response = await fetch(`http://localhost:3000/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log("Full Response:", response);

                // Check if the response is JSON
                if (!response.ok) {
                    console.error("Error: ", response.status, response.statusText);
                    return;
                }

                let parsed_Response = await response.json();
                console.log("parsed_Response", parsed_Response);

                let data = parsed_Response.data;
                console.log("data", data);



                // Update the userData state with the fetched data
                setUserData(data);

            } catch (error) {
                console.log("Fetch error:", error);
            }
        }

        fetchData();
    }, []);


    const add = async () => {
        try {
            // Extract token_key from URL
            let params = new URLSearchParams(window.location.search);
            let token_key = params.get("login");


            // Get token from localStorage using the key
            let token = localStorage.getItem(token_key);
            if (!token) {
                console.error("Token not found in localStorage.");
                return;
            }


            // Navigate to AddEmployee page with token and id as query parameters
            navigate(`/AddEmployee?login=${token_key}`);
        } catch (error) {
            console.error("Error in add function:", error);
        }
    };

    const logout = () => {
        console.log("Logout function triggered");
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);
        console.log("Token:", token);


        if (token) {
            localStorage.removeItem(token_key);  // Remove the token
            navigate(`/Login`);
        } else {
            console.log("No token found");
        }
    };

    const singleData = async (id) => {
        let params = new URLSearchParams(window.location.search);
        console.log('params', params);

        let token_key = params.get('login');
        console.log("token_key", token_key);

        // let id = params.get('id');
        // console.log("id", id);

        let token = localStorage.getItem(token_key)
        navigate(`/SingleEmpView?login=${token_key}&id=${id}`)
    };

    const updateData = async (id) => {
        let params = new URLSearchParams(window.location.search);
        console.log('params', params);

        let token_key = params.get('login');
        console.log("token_key", token_key);

        // let id = params.get('id');
        // console.log("id", id);

        let token = localStorage.getItem(token_key)
        navigate(`/UpdateUser?login=${token_key}&id=${id}`)
    };
    const deleteData = async (id) => {

        let params = new URLSearchParams(window.location.search)
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        console.log("reached......")

        try {
            let response = await fetch(`http://localhost:3000/userDelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("response :", response)

            if (response.status === 200) {
                alert("Employee successfully deleted ");
                navigator(`/Admin?login=${token_key}`)

            } else {
                alert("Something went wrong ");
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    // deleteData()

    return (
        <>
            <div className="admin_container">
                <nav className="p-3 admin_nav">
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
                                <a className=" text-decoration-none text-white fs-6" href="/admin">
                                    Home
                                </a>
                            </span>
                            <span className="px-4">
                                <a className=" text-decoration-none text-white fs-6" href="">
                                    File
                                </a>
                            </span>
                            <span className="px-4">
                                <a className=" text-decoration-none text-white fs-6" href="">
                                    About
                                </a>
                            </span>
                            <span className="px-4">
                                <a className=" text-decoration-none text-white fs-6" href="">
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
                <div className="d-flex">
                    <div className="blanck">
                        <div className="text-center pt-5">
                            <img
                                src="https://img.icons8.com/?size=100&id=492ILERveW8G&format=png&color=000000"
                                style={{ width: 60, height: 60 }}
                                alt=""
                            />
                        </div>
                        <div className="text-center pt-5">
                            <img
                                onClick={add}
                                src="https://img.icons8.com/?size=100&id=44535&format=png&color=000000"
                                style={{ width: 60, height: 60 }}
                                alt=""
                            />
                            <br />
                        </div>
                        <div className="text-center pt-5">
                            <img
                                src="https://img.icons8.com/?size=100&id=21103&format=png&color=000000"
                                style={{ width: 60, height: 60 }}
                                alt=""
                            />
                        </div>
                        <div className="text-center pt-5">
                            <img
                                onClick={logout}
                                src="https://img.icons8.com/?size=100&id=vcvBMGD6n6ZL&format=png&color=FFFFFF"
                                style={{ width: 60, height: 60 }}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="user">
                        <table className="bg-white">
                            <thead>
                                <tr className="table-head">
                                    <th>Photos</th>
                                    {/* <th>ID</th> */}
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>View</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody id="userTable">
                                {userData.length > 0 ? (
                                    userData.map((user) => (
                                        <tr key={user._id}>
                                            <td className="hov">
                                           
                                                {user.image ? (
                                                   

                                                    <img
                                                        src={user.image}
                                                        style={{ width: 20, height: 20 }}
                                                        alt="User"
                                                    />
                                                ) : (
                                                    <img
                                                        src="" // Fallback image
                                                        style={{ width: 20, height: 20 }}
                                                        alt="Fallback User"
                                                    />
                                                    
                                                )}
                                            </td>

                                            {/* <td className="hov">{user._id}</td> */}
                                            <td className="hov">{user.name}</td>
                                            <td className="hov">{user.email}</td>
                                            <td className="hov">{user.phoneno}</td>
                                            <td>
                                                <button
                                                    className="adcustom-btn adbtn-16"
                                                    onClick={() => singleData(user._id)}
                                                >
                                                    View
                                                </button>
                                            </td>
                                            <td>
                                                <i
                                                    className="fa fa-pencil-square-o"
                                                    onClick={() => updateData(user._id)}
                                                    style={{ fontSize: 30 }}
                                                ></i>
                                            </td>
                                            <td>
                                                <i
                                                    className="fa fa-trash"
                                                    onClick={() => deleteData(user._id)}
                                                    style={{ fontSize: 30, color: "red" }}
                                                ></i>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;
