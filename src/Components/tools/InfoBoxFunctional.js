import React, { useEffect, useRef, useState, Fragment } from "react";

export function InfoBox(props) {
  console.log(props)
  //parentCallback
  const initialFormState = { id: "", name: "", username: "", smallp: "" };
  const [user, setUser] = useState(initialFormState);
  let ref = useRef(null);
  const handleClickOutsides = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        props.onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsides, true);
  });

  if (!props.show) return null;

  // child close btn
  function handleClickx(event) {
    console.log(event)
    // Here, we invoke the callback with the new value
    props.onParentSet(false);
  }

  const handleInputChange = (event) => {
    const formDataCopy = { ...user };
    formDataCopy[event.target.name] = event.target.value;
    setUser(formDataCopy);
  };

  const addNew = (e) => {
    if (!user.name || !user.username) return;
    props.addUser(user);
    setUser(initialFormState);
    console.log(user);
  };

  return (
    <div className="modal-modal">
      <div ref={ref} className="flex-crud">
        {/* {props.message} */}
        {Object.keys(user).map((key, index) => {
          if (!(key == "id"))
            return (
              <Fragment key={key}>
                <label htmlFor={key}>{key}</label>
                <input
                  type="text"
                  name={key}
                  value={user[key]}
                  onChange={handleInputChange}
                />
              </Fragment>
            );
        })}
        <button className="btn" onClick={addNew}>
          Add new user
        </button>
        <button className="btn exit" onClick={handleClickx}>
          Cancel
        </button>
      </div>
    </div>
  );
}
