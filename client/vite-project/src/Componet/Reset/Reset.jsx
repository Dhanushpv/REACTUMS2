import {useState } from "react";
import { useNavigate } from 'react-router-dom';

function Reset() {
    const [password, setPassword] = useState(''); // State to store current password
    const [newpassword, setNewpassword] = useState(''); // State to store new password
    const navigate = useNavigate();

    const resetPassword = async (event) => {
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

        const data = {
            newpassword,
            password
        };

        const strdata = JSON.stringify(data);
        console.log("strdata : ", strdata);

        try {
            let response = await fetch(`http://localhost:3000/resetPassword/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: strdata
            });

            console.log("response", response);

            let data = await response.json();
            console.log("Response data:", data);

            if (response.status === 200) {
                alert("Your password reset was successful");
                navigate('/Login')
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
                    <form onSubmit={resetPassword} className="Reset_form">
                        <div className="reset_insidecontainer text-center">
                            <div className="d-flex">
                                <div>
                                    <label htmlFor="password">Current password: </label>
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
                            <div className="d-flex pt-5">
                                <div>
                                    <label htmlFor="newpassword">New password: </label>
                                </div>
                                <div className="new">
                                    <input 
                                        type="password" 
                                        name="newpassword" 
                                        id="newpassword" 
                                        value={newpassword} 
                                        onChange={(e) => setNewpassword(e.target.value)} 
                                    />
                                </div>
                            </div>
                            <div className="pt-5">
                                <input
                                    type="submit"
                                    name="submit"
                                    id="submit"
                                    defaultValue="Submit"
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

export default Reset;
