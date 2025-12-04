import useField from "../hooks/useField";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const name = useField("text");
  const email = useField("email");
  const password = useField("password");
  const phone_number = useField("text");
  const gender = useField("text");
  const date_of_birth = useField("date");
  const membership_status = useField("text");

  const { signup, isLoading, error } = useSignup("/api/user/signup");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await signup({
      name: name.value,
      email: email.value,
      password: password.value,
      phone_number: phone_number.value,
      gender: gender.value,
      date_of_birth: date_of_birth.value,
      membership_status: membership_status.value
    });

    // If no error after signup → navigate
    if (!error) {
      console.log("Signup success");
      navigate("/login");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />

        <label>Email:</label>
        <input {...email} />

        <label>Password:</label>
        <input {...password} />

        <label>Phone Number:</label>
        <input {...phone_number} />

        <label>Gender:</label>
        <input {...gender} />

        <label>Date of Birth:</label>
        <input {...date_of_birth} />

        <label>Membership Status:</label>
        <input {...membership_status} />

        <button disabled={isLoading}>Sign Up</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
