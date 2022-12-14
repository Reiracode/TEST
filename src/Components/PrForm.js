import React, { useState,useEffect } from "react";
import { useAuthState } from "../Context";
import AddUserForm from "./forms/AddUserForms";
import EditUserForm from "./forms/EditUserForm";
import ListTable from "./tables/ListTable";
import OpenModal from "./tools/OpenModal";
import singleton from "../Singleton";
import axios from "axios";
// // confirm dialog
// https://www.taniarascia.com/crud-app-in-react-with-hook //

const PrForm = (props) => {
  // global state:userno
  const { userno } = useAuthState();
  const initialFormState = { username: userno, userdep: "", userdate: "" };
  const [listHead, setListHead] = useState(initialFormState);

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [editing, setEditing] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const [show, SetShow] = useState(false);
  const [formNames, setFormNames] = useState("add");

  const handOpen = () => {
    setOpenBox(!openBox);
    SetShow(true);
  };

  const showModa = () => {
    SetShow(!show);
    setFormNames("add");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setListHead({ ...listHead, [name]: value });
  };

  // CRUD operations
  const addUser = (user) => {
    console.log(users);
    //一開始 新增資料
    if (users.length == 0) {
      user.id = users.length + 1;
    } else {
      let maxid = users.slice(-1)[0].id;
      user.id = maxid + 1;
    }

    // user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setEditing(false);
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setFormNames("edit");
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));

    showModa();
  };

  const editRow = (user) => {
    setEditing(true);
    setFormNames("edit");
    setCurrentUser({
      id: user.id,
      name: user.name,
      username: user.username,
      smallp: user.smallp,
      datatime: user.datatime,
    });
  };

  async function makeGetRequest() {
    const id = 'reira.igg-178246c9-c6da-466e'
    const key = '9f16dc51-0a6e-492c-9dd6-278b917d0c67'
    const auth_url = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token'
    const headers = 'content-type: application/x-www-form-urlencoded'
    const parameter = {
      grant_type: "client_credentials",
      client_id: id,
      client_secret: key,
    };    

    try {
      let res = await axios({
        method: "POST",
        url: auth_url,
        data: JSON.stringify(parameter),
        headers: { headers },
      });
      console.log(res.data)
      let accesstoken = res.data;
      return {
        authorization: `Bearer ${accesstoken.access_token}`,
      }
    } catch (err) {
      return err;
    }
    //--------------------
    // let payload = {
    //   heads: listHead,
    //   bodys: users,
    // };

    // console.log(payload);
    //********* create *********
    // axios
    //   .post("localhost:3001/customer", payload)
    //   .then((res) => {
    //     console.table(res.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // ********* DELETE *********
    // let delno = "19";
    // axios.delete(`/customers/${delno}`).then((res) => console.log(res.data));
  }

  //  submit form
  const handleSubmit = (evt) => {
   
    makeGetRequest();
    evt.preventDefault();

    console.log(JSON.stringify(listHead));
    const payload = {email:"wwan@gmail.com" ,name: "TEST", active:"Y"}  
    // { "username": "000002", "userdep": "131212", "userdate": "2022-09-01" }  
    // let data = {
    //   header: listHead,
    //   header_detail: users,payload=
    // };
    // console.log(JSON.stringify(data));

    // let payload = {
    //   heads: listHead,
    //   bodys: users,
    // };

    // console.log(users);
    // axios
    //   .post("http://localhost:3001/customer", payload)
    //   .then((res) => {
    //     // console.table(res.data);
    //     const { data } = res
    //     console.log(data)
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    //-----------------------------------------
    // fetch(singleton.domainName + "/form_post_prform.php", {
    //   method: "POST", // or 'PUT'
    //   body: JSON.stringify(data),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((response) => {
    //     console.log("Success:", JSON.stringify(response));
    //     if ((response = "sucess")) {
    //       console.log("遞迴");
    //       props.history.push("/poform");
    //     }
    //   })
    //   .catch((error) => console.error("Error:", error));
    
    
  };


  useEffect(() => {
    // axios.get("http://localhost:3001/").then(response => {
    //   const { data } = response
    //   setEmployees(data.result)
    // })

    // axios.get("http://localhost:3001/customers").then(response => {
    //   const { data } = response
    //   console.log(data)
    //   // setDepartments(data.result)
    // })
  }, [])

  return (
    <section className="container contact">
      <h1>PR請購單xxxxxx</h1>
      <div className="flex_form">
        <form id="myForm">
          <div className="flex-large">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputUsername">員工姓名</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  name="username"
                  value={listHead.username}
                  // value={userDetails.userno}
                  onChange={handleInputChange}
                  placeholder="員工姓名"
                  autoFocus={true}
                  required
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputUserdep">員工部門</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUserdep"
                  name="userdep"
                  value={listHead.userdep}
                  onChange={handleInputChange}
                  placeholder="員工部門"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputUsertime">需用時間</label>
                <input
                  type="date"
                  className="form-control"
                  id="inputUsertime"
                  name="userdate"
                  value={listHead.userdate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </form>

        <div className="flex-list">
          <OpenModal
            show={show}
            handleClose={() => {
              SetShow(false);
            }}
            onClickOutside={() => {
              SetShow(false);
            }}
          >
            {formNames === "add" ? (
              <AddUserForm addUser={addUser} SetShow={SetShow} />
            ) : formNames === "edit" ? (
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
                SetShow={SetShow}
              />
            ) : null}
          </OpenModal>

          <button className="btn add_item" type="button" onClick={showModa}>
            +請購項目
          </button>

          <ListTable
            isOpen={handOpen}
            users={users}
            editRow={editRow}
            deleteUser={deleteUser}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          submit
        </button>
      </div>
    </section>
  );
};

export default PrForm;
