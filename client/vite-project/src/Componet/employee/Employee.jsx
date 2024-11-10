import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Employee() {
    const navigate = useNavigate();
    const main_view = async ()=>{

        try {
            // Extract token_key from URL
            let params = new URLSearchParams(window.location.search);
            let token_key = params.get("login");


            // Get token from localStorage using the key
            let token = localStorage.getItem(token_key);
            let id = params.get('id')
            if (!token) {
                console.error("Token not found in localStorage.");
                return;
            }


            // Navigate to AddEmployee page with token and id as query parameters
            navigate(`/SingleEmpView?login=${token_key}&id=${id}`);
        } catch (error) {
            console.error("Error in add function:", error);
        }
    }
    const singleViewsignout = async =>{
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
    }
    return (
        <>

        <div className='employee_body'>
            <nav className="p-2 employee_nav">
                <div className="d-flex justify-content-between align-items-center container">
                    <div>
                        <img
                            src="https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000"
                            style={{ width: 70, height: 70, zIndex: 1 }}
                            alt=""
                        />
                        <span className="fs-3 text-center fw-bold  text-white  p-2">UMS</span>
                    </div>
                    <div>
                        <span className="px-4">
                            <a className=" text-decoration-none text-white fs-6" href="">
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
                        <button className="em_bttn2">SIGIN IN</button>
                        <span className="px-4">
                            <img
                                onClick={main_view}
                                src="https://img.icons8.com/?size=100&id=GKa451kLBjuW&format=png&color=000000"
                                alt=""
                                style={{ width: 40 }}
                            />
                        </span>
                        <span className="">
                            <img
                                onClick={singleViewsignout}
                                src="https://cdn-icons-png.freepik.com/256/10024/10024016.png?uid=R94193599&ga=GA1.1.1087699444.1718933879&semt=ais_hybrid"
                                alt=""
                                style={{ width: 40 }}
                            />
                        </span>
                    </div>
                </div>
            </nav>
            <span className="employee_welcom position-absolute top-50 start-50 translate-middle maintext_container pb-5">
                WELLCOME TO
            </span>
            <div className="console-container welcome2 position-absolute top-50 start-50 translate-middle pt-5 fs-2 text-white fw-bold">
                <span id="text" />
            </div>
        </div>



        </>
    )
}
export default Employee