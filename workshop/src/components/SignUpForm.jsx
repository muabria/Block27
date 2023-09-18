
import { useState } from "react";

export default function SignUpForm({token,setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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

    }catch(e){
      console.error(e.message);
      setError(e.message);
    }
  }



  return (

      <div>
      <h2>Hello</h2>
      {error && <p>{error}</p>}
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Username: <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/><br></br>
        </label>
        <label>
          Password: <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br></br>
        </label>
        <button>Submit</button>
      </form>
      </div>
      
  );
}