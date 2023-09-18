
import { useState } from "react";

export default function SignUpForm({token,setToken}) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const handleUserName = (e) => {
    if (e.target.value === null) {
      setError("Please Enter username ");
    }

    if (e.target.value.length >= 20) {
      setError("UserName is too long");
    }
    if (error && e.target.value.length < 20) {
      setError("");
    }
  };

  
  const handlePassword = (e) => {
    if (e.target.value === null) {
      setError("Please Enter Password ");
    }

    if (e.target.value.length >= 20) {
      setError("Password is too long");
    }
    if (error && e.target.value.length < 20) {
      setError("");
    }
  };


  async function handleSubmit(e){
    e.preventDefault();
    try{
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
         method:"POST",
         data:JSON.stringify({username,password})
        });
        const data = await response.json();
        console.log(data);
        setToken(data.token);
        if(token!== null)console.log(token);
        setUsername(null);
        setPassword(null);
        setSubMessage(data.message);

    }catch(e){
      console.error(e.message);
      setError("Looks like something went, please try again");
    }
  }



  return (

      <div>

      <h2>Hello, Sign in to your account! </h2>
      {error && <p>{error}</p>}
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Username: <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/><br></br>
        </label>
        <label>
          Password: <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br></br>
        </label>
        <button>Sign in </button>
      </form>
      </div>

  );
}