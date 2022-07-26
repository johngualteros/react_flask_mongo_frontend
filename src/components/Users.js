import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API;
export const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [editing,setEditing] = useState(false);
  const [id, setId] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!editing){
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      await res.json();
    }else{
      const res=await fetch(`${API}/users/${id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          name,
          email,
          password
        })
      })
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId(null);
    }
    await getData();

    setName('');
    setEmail('');
    setPassword('');
  };
  const getData = async () => {
    const response = await fetch(`${API}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    getData();
  }, []);
  const editUser = async (id) => {
    const response = await fetch(`${API}/users/${id}`);
    const data = await response.json();
    setEditing(true);
    setId(id);
    setName(data.name);
    setEmail(data.email);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      await getData();
    }
  };
  return (
    <div className="w-10/12 m-auto">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="p-3">
          <h1 className="text-3xl text-center text-sky-500 font-bold m-3">
            {editing?'Update':'Create'} User
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="block w-full my-4 p-1 rounded-md shadow-lg text-white outline-none bg-transparent border-2 border-sky-300"
              id="name"
              name="name"
              placeholder="Enter a Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="block w-full my-4 p-1 rounded-md shadow-lg text-white outline-none bg-transparent border-2 border-sky-300"
              id="email"
              name="email"
              placeholder="Enter an Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="block w-full my-4 p-1 rounded-md shadow-lg text-white outline-none bg-transparent border-2 border-sky-300"
              id="password"
              name="password"
              placeholder="Enter a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full p-2 bg-cyan-500 shadow-lg shadow-cyan-500/50 font-bold rounded-lg  text-white hover:bg-sky-400">
              Save
            </button>
          </form>
        </div>
        <div>
          <h1 className="text-3xl text-center text-sky-500 font-bold">
            List Users
          </h1>
          <table className=" w-full text-center border-2 border-cyan-500 shadow-lg shadow-cyan-500/50 rounded-xl text-white">
            <thead className="border-2 border-cyan-500">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-2 border-cyan-500">
                  <td className="text-sm font-bold">{user.name}</td>
                  <td className="text-sm font-semibold">{user.email}</td>

                  <td>
                    <button
                      class="w-full bg-blue-700 rounded-md my-1"
                      onClick={() => editUser(user._id)}
                    >
                      Edit
                    </button>
                    <button
                      class="w-full bg-red-700 rounded-md my-1"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
