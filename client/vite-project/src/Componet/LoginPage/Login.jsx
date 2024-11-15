import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import styles from '';



function Login() {
  const [email, setEmail] = useState(''); // State to store email
  const [password, setPassword] = useState(''); // State to store password
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("reached....");

    const data = {
      email,
      password
    };

    const strdata = JSON.stringify(data);
    console.log("strdata : ", strdata);

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: strdata
      });
      console.log('response', response);

      let parsed_Response = await response.json()
      console.log("parsedRespoce : ", parsed_Response);

      let token_data = parsed_Response.data;
      console.log("token_data : ", token_data);

      let user_type = token_data.user_type.user_type;
      console.log("usertype", user_type)  // Ensure user_type exists properly
      let token = token_data.token;
      let id = token_data.id;
      console.log("id", id);

      // Set token in localStorage
      let token_key = id;
      localStorage.setItem(token_key, token);
      console.log("token_key", token_key);



      if (response.ok) {
        let loginCountKey = `${id}_login_count`;
        let loginCount = localStorage.getItem(loginCountKey);

        if (!loginCount) {
          // If first time login, set count to 1 and redirect to reset password page
          localStorage.setItem(loginCountKey, 1);
          alert("This is your first login. Please reset your password.");

          navigate(`/Reset?login=${token_key}&id=${id}`);
          return; // Stop further execution after redirection
        } else {
          // Increment login count
          loginCount = parseInt(loginCount) + 1;
          localStorage.setItem(loginCountKey, loginCount);
        }

        console.log(`User has logged in ${loginCount} times`);

        // Redirect based on user type
        if (user_type === 'Admin') {
          navigate(`/Admin?login=${token_key}&id=${id}`);
        } else if (user_type === "employee") {
          navigate(`/Employee?login=${token_key}&id=${id}`);
        }

      } else {

        console.log('Login failed:', errorResult.message);
      }

    } catch (error) {
      console.error("error", error);
    }
  };

  const forgotPassword = () => {
    navigate(`/ForgetPassword`);
  };

  return (
    <>
      <div className="loginContainer " >
        <div className='position-absolute top-50 start-0 translate-middle-y text-white'><span className='logintextContainer'>Welcome back!</span> <br /> <span className='logintextContainer2'>Ready to dive in</span></div>
        {/* <div>
          <nav className="p-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <img
                  src="https://img.icons8.com/?size=100&id=oROcPah5ues6&format=png&color=000000"
                  style={{ width: 70, height: 70 }}
                  alt="UMS logo"
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
                <span className="px-4">
                  <img
                    src="https://img.icons8.com/?size=100&id=STOBCZbtLToI&format=png&color=000000"
                    style={{ width: 50, height: 50 }}
                    alt="User icon"
                  />
                </span>
              </div>
            </div>
          </nav>
        </div> */}

        <div className=''>
          <div className='formContainer position-absolute top-50 end-0 translate-middle '>
            <form
              onSubmit={handleSubmit}
              className="px-5 border formSubcontainer"
            >
              <h1 className="fw-bold text-center pt-5">
                <i
                  className="fa fa-user-circle-o"
                  style={{ fontSize: 100, color: 'whitesmoke', opacity: .8 }}
                />
              </h1>
              <div className="pt-5">
                <div>
                  <i
                    className="fa fa-envelope px-2 pt-1 text-center position-absolute"
                    style={{ fontSize: 25, color: "whitesmoke", margin: 4 }}
                  />
                  <input
                    type="email"
                    className="p-2 input_box"
                    name="email"
                    style={{ textAlign: "center" }}
                    placeholder="Email"
                    id="email"
                    value={email} // Controlled input value
                    onChange={(e) => setEmail(e.target.value)} // Update state
                    required
                  />
                </div>
              </div>
              <div className="pt-5">
                <div style={{ position: 'relative' }}>
                  <i
                    className="fa fa-lock px-2 pt-1 text-center position-absolute"
                    style={{ fontSize: 25, color: 'whitesmoke', margin: 5 }}
                  />
                  <input
                    type={isPasswordVisible ? 'text' : 'password'} // Toggle input type
                    className="p-2 input_box"
                    name="password"
                    style={{ textAlign: 'center' }}
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* Eye icon for toggling visibility */}
                  <i
                    onClick={togglePasswordVisibility}
                    className={`fa ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
                    style={{ top: '50%', right: 10, cursor: 'pointer', transform: 'translateY(-50%)', fontSize: 25, color: 'whitesmoke' }}
                  />
                </div>
              </div>
            
              <div className="pt-5 pb-5 text-center">
                <input
                  type="submit"
                  className="custom-btn btn-2 "
                  value="LOGIN"
                />
              </div>
              <div className="d-flex">
                <div className="fs-6 px-4">
                  <input type="checkbox" />
                  Remember me
                </div>
                <div className="pb-5">
                  <span onClick={forgotPassword} style={{ cursor: 'pointer', color: 'blue' }}>
                    Forgot password?
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* <h1 className='text-3xl font-bold text-red-500'>wellcome</h1> */}

      

      </div>
    </>
  );
}

export default Login;
