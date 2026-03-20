{
  /*
          Login form capable of producing basic oauth2 reqs similar to this https post request:
          POST https://localhost:4000/auth/token
          Content-Type: application/x-www-form-urlencoded

          username=testuser1&password=password123


        */
}
const url = "https://192.168.1.229:4000/auth/token";

const AuthData = ({ setToken }) => {

  const postData = async (form) => {
    form.preventDefault();

    const formData = new FormData(form.target);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });

    if (res.ok) {
      const responseData = await res.json();
      setToken(responseData.access_token);
      localStorage.setItem("token", responseData.access_token);
      form.target.reset();
    }
  };

  return (
    <>
      <form className="mt-1 mb-5" onSubmit={postData}>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button className="mx-3 btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default AuthData;
