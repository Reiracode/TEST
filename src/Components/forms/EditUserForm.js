import React, { useState, useEffect } from "react";

const EditUserForm = (props) => {
  const [user, setUser] = useState(props.currentUser);
  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const handleUpdate = () => {
    console.log("handleUpdate");
    props.updateUser(user.id, user);
  };

  return (
    <>
      <h3>Editform</h3>
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={user.name}
        onChange={handleInputChange}
      />
      <label>Username</label>
      <input
        type="text"
        name="username"
        value={user.username}
        onChange={handleInputChange}
      />
      <label>smallp</label>
      <input
        type="text"
        name="smallp"
        value={user.smallp}
        onChange={handleInputChange}
      />
      <button className="btn" onClick={handleUpdate}>
        Update user
      </button>
      {/* <button onClick={() => props.SetShow(false)}>close3</button>
            <button className="btn" onClick={() => props.isOpen(false)} >Cancel</button> */}
    </>
  );
};

export default EditUserForm;
