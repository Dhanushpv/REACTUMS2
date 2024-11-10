
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function SingleEmpView() {
    const [userData, setUserData] = useState(null); // State to hold user data
    const [error, setError] = useState(null); // State to hold errors
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the user data when the component mounts
        const fetchUserData = async () => {
            let params = new URLSearchParams(window.location.search);
            let id = params.get("id");
            let token_key = params.get("login");
            let token = localStorage.getItem(token_key);

            try {
                let response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "Application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let parsed_Response = await response.json();
                console.log("parsed_Response", parsed_Response);
                setUserData(parsed_Response.data); // Set user data to state
            } catch (error) {
                console.log("Error:", error);
                setError("Error loading data"); // Set error message to state
            }
        };

        fetchUserData();
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    const resetCall = (id) => {
        
        let params = new URLSearchParams(window.location.search);
        console.log('params', params);

        let token_key = params.get('login');
        console.log("token_key", token_key);

        // let id = params.get('id');
        // console.log("id", id);

        let token = localStorage.getItem(token_key)
        navigate(`/Reset?login=${token_key}&id=${id}`)
        console.log(`Resetting user with ID: ${id}`);
    };

    return (
        <div className="singleView">
            <div className="body ">
                <nav className="p-2">
                    <div className="d-flex justify-content-between align-items-center container">
                        <div>
                            <img
                                src="https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000"
                                style={{ width: 70, height: 70, zIndex: 1 }}
                                alt="UMS Logo"
                            />
                            <span className="fs-3 text-center fw-bold text-white p-2">UMS</span>
                        </div>
                        <div>
                            <span className="px-4">
                                <a className="text-decoration-none text-white fs-6" href="">
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
                            <button className="bttn2">SIGN IN</button>
                            <a
                                className="btn"
                                data-bs-toggle="offcanvas"
                                href="#offcanvasExample"
                                role="button"
                                aria-controls="offcanvasExample"
                            >
                                <i className="fa fa-bars" style={{ fontSize: 26 }} />
                            </a>
                            <div
                                className="offcanvas offcanvas-start"
                                tabIndex={-1}
                                id="offcanvasExample"
                                aria-labelledby="offcanvasExampleLabel"
                            >
                                <div className="offcanvas-header">
                                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                                        <div className="">
                                            <img
                                                src="https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000"
                                                style={{ width: 70, height: 70, zIndex: 1 }}
                                                alt="UMS Logo"
                                            />
                                            <span className="fs-3 text-center fw-bold p-2" style={{ color: "black" }}>
                                                UMS
                                            </span>
                                        </div>
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close text-reset"
                                        data-bs-dismiss="offcanvas"
                                        aria-label="Close"
                                    />
                                </div>
                                <div className="offcanvas-body">
                                    {userData && (
                                        <button
                                            className="custom-btn btn-2"
                                            onClick={() => resetCall(userData._id)}
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="position-absolute top-0 start-50 translate-middle-x icon">
                    <i
                        className="far fa-user-circle shadow p-3 mb-5 bg-body rounded"
                        style={{ fontSize: 200 }}
                    />
                </div>
            </div>

            <div className="position-absolute top-50 start-50 translate-middle icon">
                <div className="fs-1 fw-bold text-dark pt-5 text-center" id="singleViewData">
                    {error && <div>{error}</div>}
                    {userData ? (
                        <>
                            <div className="pt-5 line2">{userData.email}</div>
                            <div className="line2">{userData.name}</div>
                            <div className="line2">{userData.phoneno}</div>
                        </>
                    ) : (
                        !error && <div>Loading...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleEmpView;
