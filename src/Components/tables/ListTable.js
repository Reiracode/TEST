import React from 'react';
// 請購單身
const ListTable = (props) => {
  console.log(props);
  return (
    <table className="table table-striped table-responsive-m">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Usersmallp</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* {Object.keys(user).map((key, index) => { */}
        {props.users.length > 0 ? (
          props.users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.smallp}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={(evt) => {
                    evt.preventDefault();
                    props.editRow(user);
                    props.isOpen(user);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => props.deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No users</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ListTable;
 