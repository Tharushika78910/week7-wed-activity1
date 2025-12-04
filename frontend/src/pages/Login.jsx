import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const name = useField("text");
  const password = useField("password");

  const { login, isLoading, error } = useLogin("/api/user/login");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await login({
      name: name.value,
      password: password.value,
    });

    if (!error) {
      console.log("Login success");
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} />

        <label>Password:</label>
        <input {...password} />

        <button disabled={isLoading}>Login</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
