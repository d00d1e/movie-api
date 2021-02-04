import React from 'react'

export default function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="registration-form">
      <h3>Sign Up</h3>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Date of Birth:
          <input type="date" value={dob} onChange={e => setDob(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}
