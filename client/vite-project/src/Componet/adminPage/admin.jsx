
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
    const [userData, setUserData] = useState([]);
    const [showOffcanvas, setShowOffcanvas] = useState(false); // For managing the offcanvas visibility
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let params = new URLSearchParams(window.location.search);
            let token_key = params.get("login");
            let token = localStorage.getItem(token_key);

            try {
                let response = await fetch(`http://localhost:3000/user`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response)

                if (!response.ok) {
                    console.error("Error: ", response.status, response.statusText);
                    return;
                }

                let parsed_Response = await response.json();
                let data = parsed_Response.data;
                console.log(data)
                setUserData(data);

            } catch (error) {
                console.log("Fetch error:", error);
            }
        }

        fetchData();
    }, []);

    const add = async () => {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get("login");
        let token = localStorage.getItem(token_key);
        if (!token) {
            console.error("Token not found in localStorage.");
            return;
        }
        navigate(`/AddEmployee?login=${token_key}`);
    };

    const logout = () => {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);
        if (token) {
            localStorage.removeItem(token_key);
            navigate(`/Login`);
        }
    };

    const singleData = async (id) => {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);
        navigate(`/SingleEmpView?login=${token_key}&id=${id}`);
    };

    const updateData = async (id) => {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);
        navigate(`/UpdateUser?login=${token_key}&id=${id}`);
    };

    const deleteData = async (id) => {
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);

        try {
            let response = await fetch(`http://localhost:3000/userDelete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                alert("Employee successfully deleted ");
                window.location.reload();
            } else {
                alert("Something went wrong ");
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    // Offcanvas Handlers
    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

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
                <div className="d-flex">
                    <div className="blanck">
                        <div className="text-center pt-5">
                            <span
                                className="fw-bolder fs-2 text-white"
                                onClick={handleShow}
                                role="button"
                                style={{fontFamily: 'Philosopher, sans-serif'}}
                            >
                                Admin
                            </span>
                        </div>

                        <div className="text-center pt-5">
                            

                            <span
                                className="fw-bolder fs-2 text-white"
                                onClick={add}

                                style={{ fontFamily: 'Philosopher, sans-serif' }}
                            >
                                AddUser
                            </span>


                        </div>
                        {/* <div className="text-center pt-5">
                            <img
                                src="https://img.icons8.com/?size=100&id=21103&format=png&color=000000"
                                style={{ width: 60, height: 60 }}
                                alt=""
                            />
                        </div> */}
                        <div className="text-center pt-5">
                          
                             <span
                                className="fw-bolder fs-2 text-white"
                                onClick={logout}

                                style={{ fontFamily: 'Philosopher, sans-serif' }}
                            >
                                LogOut
                            </span>
                        </div>
                    </div>
                    <div className="user">
                        <table className="bg-white">
                            <thead>
                                <tr className="table-head">
                                    <th>Photos</th>
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
                                            <td className="hov text-center">
                                                {user.image ? (
                                                    <img
                                                        src={`http://localhost:3000/${user.image}`} // Use template literals with ${}
                                                        style={{ width: 50, height: 50 }}
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

                {/* Bootstrap Offcanvas */}
                <Offcanvas show={showOffcanvas} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title> <img
                            src="https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000"
                            style={{ width: 70, height: 70, zIndex: 1 }}
                            alt=""
                        />UMS</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {/* <h5>Logged In User Details</h5> */}
                        {userData && userData.length > 0 ? (
                            <div>
                                <p><strong>Name:</strong> {userData[0].name}</p>
                                <p><strong>Email:</strong> {userData[0].email}</p>
                                <p><strong>Phone:</strong> {userData[0].phoneno}</p>
                                {/* Add more fields if needed */}
                            </div>
                        ) : (
                            <p>No user details available.</p>
                        )}
                    </Offcanvas.Body>

                </Offcanvas>
            </div>
        </>
    );
}

export default Admin;
