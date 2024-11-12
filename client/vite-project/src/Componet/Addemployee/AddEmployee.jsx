
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployee() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [image, setImage] = useState(null);
    const [userType, setUserType] = useState('');
    const [userTypes, setUserTypes] = useState([]);

    // Fetch user types when the component mounts
    const usertypeSelection = async () => {
        try {
            let response = await fetch('http://localhost:3000/getUsertypes', {
                method: 'GET'
            });
            let parsed_data = await response.json();
            setUserTypes(parsed_data.data);
        } catch (error) {
            console.error('Error fetching user types:', error);
        }
    };

    useEffect(() => {
        usertypeSelection();
    }, []);



    const addEmployee = async (event) => {
        event.preventDefault();
        console.log("Form submission reached...");
    

    
        // Get the token from URL parameters
        let params = new URLSearchParams(window.location.search);
        let token_key = params.get('login');
        let token = localStorage.getItem(token_key);
    
        // Convert image to Base64 if an image is selected
        if (image) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64ImageString = reader.result;
    
                // Prepare the data to be sent
                const data = {
                    name,
                    email,
                    phoneno,
                    user_type: userType,
                    image: base64ImageString
                };
    
                try {
                    let response = await fetch('http://localhost:3000/user', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                    });
    
                    if (response.status === 200) {
                        alert('Employee successfully added');
                        navigate(`/Admin?login=${token_key}`); // Navigate after successful response
                    } else {
                        alert('Something went wrong');
                    }
    
                } catch (error) {
                    console.log("Error:", error);
                }
            };
    
            reader.readAsDataURL(image);
        } else {
            alert("Please select an image.");
        }
    };
    

    return (
        <div className="AddEmployee_container">
            <nav className="p-2">
                <div className="d-flex justify-content-between align-items-center container">
                    <div>
                        <img
                            src="https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000"
                            style={{ width: 70, height: 70, zIndex: 1 }}
                            alt=""
                        />
                        <span className="fs-3 text-center fw-bold text-white p-2">UMS</span>
                    </div>
                    <div>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="/admin">Home</a>
                        </span>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="">File</a>
                        </span>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="">About</a>
                        </span>
                        <span className="px-4">
                            <a className="text-decoration-none text-white fs-6" href="">Contact</a>
                        </span>
                        <button className="bttn2">SIGN IN</button>
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
            <div className="pt-1 px-5">
                <div className="shadow-lg p-3 mb-5 login pt-2 bord">
                    <form
                        onSubmit={addEmployee}
                        className="d-flex justify-content-center align-items-center flex-column"
                    >
                        <h1 className="fw-bold text-center pt-4">ADD EMPLOYEE</h1>
                        <div className="pt-2 text-white d-flex justify-content-center align-items-center">
                            <label htmlFor="name">Name</label>
                            <div className="types">
                                <input
                                    type="text"
                                    className="p-2 usertypes fw-bold text-dark"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="pt-5 text-white d-flex justify-content-center align-items-center">
                            <label htmlFor="email">Email</label>
                            <div className="types1">
                                <input
                                    type="email"
                                    className="p-2 usertypes fw-bold text-dark"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="pt-5 text-white d-flex justify-content-center align-items-center">
                            <label htmlFor="phoneno">Phone No</label>
                            <div className="types2">
                                <input
                                    type="number"
                                    className="p-2 usertypes fw-bold text-dark"
                                    id="phoneno"
                                    value={phoneno}
                                    onChange={(e) => setPhoneno(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="pt-4 text-white d-flex justify-content-center align-items-center">
                            <label htmlFor="image">Image</label>
                            <div className="types4">
                                <input
                                    type="file"
                                    className="p-2 usertypes fw-bold text-dark"
                                    id="image"
                                    onChange={(e) => setImage(e.target.files[0])}
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
                                    <option value="" disabled>Select Your Type</option> {/* No need for selected attribute */}
                                    {userTypes.map((type, index) => (
                                        <option key={index} value={type.user_type}>
                                            {type.user_type}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="pt-4 pb-5">
                            <input
                                type="submit"
                                className="custom-btn btn-2"
                                value="SUBMIT"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
