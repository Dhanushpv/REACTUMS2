import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function ForgetReset() {
    const [password, setPassword] = useState(''); // State to store the new password
    const navigate = useNavigate();

    const forgetRepassword = async (event) => {
        event.preventDefault();
        console.log("reached....");

        let params = new URLSearchParams(window.location.search);
        console.log("params", params);
        let token_key = params.get('login');
        console.log("token_key", token_key);
        let token = localStorage.getItem(token_key);
        console.log("token", token);
        let id = params.get('id');
        console.log("id", id);

        if (!token) {
            console.error("No token found in localStorage");
            return;
        }

        const data = { password };
        const strdata = JSON.stringify(data);
        console.log("strdata : ", strdata);

        try {
            let response = await fetch(`http://localhost:3000/forgotresetPassword`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: strdata
            });

            if (response.ok) {
                console.log("Password updated successfully.");
                // Redirect to login or home page
                navigate('/login');
            } else {
                console.error("Failed to reset password.");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="reset_container">
            <div className="reset_container">
                <div className="d-flex justify-content-between align-items-center pt-4">
                    <div>
                        <h1 className="text-center position-absolute top-50 start-50 translate-middle reset_containerText ">
                            Reset Your Password
                        </h1>
                        <div className="reset_container position-absolute top-50 start-50 translate-middle">
                            <form onSubmit={forgetRepassword} className="Reset_form">
                                <div className="reset_insidecontainer text-center">
                                    <div className="d-flex">
                                        <div>
                                            <label htmlFor="password">New password: </label>
                                        </div>
                                        <div className="current">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-5">
                                        <input
                                            type="submit"
                                            name="submit"
                                            id="submit"
                                            value="Submit"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetReset;
