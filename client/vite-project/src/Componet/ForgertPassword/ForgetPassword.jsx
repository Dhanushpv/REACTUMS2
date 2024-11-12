import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

function ForgetPassword(){
    const [email, setEmail] = useState('');

    const resetPasswordHandler=async (event)=>{
        event.preventDefault()
        const data = { 
            email,
          };
          let strdata =JSON.stringify(data);
          console.log('strdata', strdata)
      
          try {
              let responce = await fetch('http://localhost:3000/forgot_password', {
                  method: 'POST',
                  headers: {
      
                      'Content-Type': 'application/json'
                  },
                  body :strdata
                  })
                  console.log(responce);
      
                  if(responce.status === 200){
                      alert("reset link is send to your email")
                  }else{
                      alert("something went worng")
                  }
          
      
          } catch (error) {
              console.log('error',error)
          }

    }
    return (
        <>
            <h1>forget password</h1>
            <form onSubmit={resetPasswordHandler}>
                <input type="email" id="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                <input type="submit" />
            </form>
        </>

    )
}
export default ForgetPassword