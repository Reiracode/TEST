import React, { useState, useEffect } from "react";
import { useAuthState } from "../Context";
// import { Redirect } from "react-router-dom";
import { Navigate, useLocation, NavLink, useNavigate } from "react-router-dom";
import EditUserForm from "./forms/EditUserForm";
import ListTable from "./tables/ListTable";

import OpenModal from "./tools/OpenModal";

// import OrderNo from "./tools/OrderNo";
import OrderNo_new from "./tools/OrderNo_new";
import OrderNo_new1 from "./tools/OrderNo_new1";

import OrderNo_radio from "./tools/OrderNo_radio";
import OrderNo_check from "./tools/OrderNo_check";

import singleton, { Recursive } from "../Singleton";
import axios from "axios";

// 無法新增資料，依請購單進行採購
// confirm dialog
//https://www.taniarascia.com/crud-app-in-react-with-hooks/

const PoForm = () => {
  const test = Recursive("221004")
  console.log(test)
  
  let location = useLocation();
  let navigate = useNavigate();

  const [show, SetShow] = useState(false);
  //  console.log(props);
  // global state:userno
  const { userno, dep } = useAuthState();
  console.log(userno)
  console.log(dep)
  let today = new Date().toISOString().substring(0, 10);
  const initialFormHeadState = {
    username: userno,
    userdep: dep,
    userdate: today,
    checkno: "no",
  };
  const [listHead, setListHead] = useState(initialFormHeadState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setListHead({ ...listHead, [name]: value });
    // let changeName = event.target.name
    // this.setState({ [changeName]: event.target.value })
    // 綁定的state值剛好對應到每個組件的name屬性，所以才可以直接抓組件name的屬性來更改state中的資料，
    // 至於加上中括號是為了讓JavaScript知道那是變數，而不會把它當成changeName來處理
  };

  const [checkNo, setCheckNo] = useState("");
  const orderNo = (name) => {
    console.log(name);
    setCheckNo(name);
    setListHead({ ...listHead, checkno: name });
  };
  // ---------------------
  const [openBox, setOpenBox] = useState(false);

  const handOpen = (event) => {
    console.log(event);
    setOpenBox(!openBox);
    console.log("openBox" + openBox);
  };
  // ---------------------
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [editing, setEditing] = useState(false);

  const deleteUser = (id) => {
    setEditing(false);
    setUsers(users.filter((user) => user.id !== id));
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    // close modal
    handOpen(false);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser({
      listno: user.listno,
      id: user.id,
      name: user.name,
      username: user.username,
      smallp: user.smallp,
      datatime: user.datatime,
    });
  };

  // const canceluser = () => {
  //   console.log('canceluser');
  //   setEditing(false);
  //   handOpen(false);
  // };
  // ---------------------
  useEffect(() => {
    if (!checkNo) return;
    //********* create *********
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`https://reqres.in/api/users/${checkNo}`)
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        var newstr = [];
        const data1 = {
          listno: data.fils,
          id: `${checkNo}`,
          name: data.first_name,
          username: data.last_name,
          smallp: data.avatar,
        };
        newstr.push(data1);
        console.log(newstr);
        setUsers(newstr);
      })
      .catch((error) => {
        console.error(error);
      });

    // fetch(singleton.domainName + `/order_query.php?id=00${checkNo}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     var search = ["listno", "id", "name", "username", "smallp"];
    //     var newstr = [];
    //     for (var i = 0; i < data.length; i++) {
    //       var filters = Object.keys(data[i])
    //         .filter((key) => search.includes(key))
    //         .reduce((obj, key) => {
    //           obj[key] = data[i][key];
    //           return obj;
    //         }, {});
    //       console.log(filters);
    //       newstr.push(filters);
    //     }
    //     console.log(newstr);

    //     var newIndex = Object.keys(data[0]);
    //     var aa = newIndex.filter((item) => {
    //       return item != "datatime" && item != "price";
    //     });

    //     console.log(aa);
    //     setUsers(newstr);
    //   })
    //   .catch((err) => {
    //     console.log("錯誤:", err);
    //   });
  }, [checkNo]);

  const [formtype, setFormType] = useState("");
  const [redirect, setRedirect] = useState({
    redirect: false,
    pathname: "",
    state: "",
  });

  //  submit form
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!users.length) {
      alert("請選單");
      return;
    }

    const data = {
      name: "morpheus",
      job: "leader",
    };

    
    fetch("https://reqres.in/api/users", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log("Success:", JSON.stringify(response));
        console.log(response);
        if (response.createdAt) {
          alert("post成功");
          setFormType("sucess");

         
          // 送出成功後，轉到Inbox
          // setRedirect({
          //   redirect: true,
          //   pathname: "/Inbox",
          //   state: { id: "090605", listno: "00004" },
          // });
          //傳遞parat
          navigate('/Inbox', { state: { id: "090605", listno: "00004" } })


        }
        // if (response.success) {
        //   alert("post成功");
        //   setFormType("sucess");
        //   // 送出成功後，轉到Inbox
        //   setRedirect({
        //     redirect: true,
        //     pathname: "/Inbox",
        //     state: { id: "090605", listno: "00" + response.listno },
        //   });
        // }
      })
      .catch((error) => console.error("Error:", error));

    //   let url = singleton.domainName + "/form_post_poform.php";
    //   let data = {
    //     header: listHead,
    //     header_detail: users,
    //   };

    //   fetch(url, {
    //     method: "POST", // or 'PUT'
    //     body: JSON.stringify(data), // data can be `string` or {object}!
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((response) => {
    //       console.log("Success:", JSON.stringify(response));
    //       console.log(response);
    //       if (response.success) {
    //         alert("post成功");
    //         setFormType("sucess");
    //         // 送出成功後，轉到Inbox
    //         setRedirect({
    //           redirect: true,
    //           pathname: "/Inbox",
    //           state: { id: "090605", listno: "00" + response.listno },
    //         });
    //       }
    //     })
    //     .catch((error) => console.error("Error:", error));
  };
//如果true 送單 就轉到inbox
  // if (redirect.redirect) {
  //   console.log(redirect.state)
  //   return (
  //     //   <Navigate
  //     //     to={{
  //     //     pathname: redirect.pathname,
  //     //     state: redirect.state,
  //     //   }}
  //     // />
  //     navigate('/Inbox', { state: redirect.state })
  //   );
  // }

  return (
    <section className="container contact">
      <h1>PO採購單</h1>
      <div className="flex_form">
        <form id="myForm" onSubmit={handleSubmit}>
          <div className="flex-large">
            <h2 className="header_line">header</h2>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputUsername">員工姓名</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUsername"
                  name="username"
                  value={listHead.username}
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
              <div className="form-group col-md-6">
                <label htmlFor="selectListno">請購單號</label>
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    id="selectListno"
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    placeholder="請購單號"
                    name="checkno"
                    value={listHead.checkno}
                    onChange={handleInputChange}
                    readOnly
                  />

                
                  <div className="input-group-append">
                    
                    <OrderNo_radio value={orderNo} />

                    <OrderNo_check value={orderNo} />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="flex-list">
            <OpenModal
              show={show}
              handleClose={() => {
                SetShow(false);
              }}
              onClickOutside={() => {
                SetShow(false);
              }}
            ></OpenModal>

            <h2>View users List</h2>
            <ListTable
              isOpen={handOpen}
              users={users}
              editRow={editRow}
              deleteUser={deleteUser}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            submit
          </button>
        </form>

        {openBox ? (
          <div className="modal-modal">
            <div className="flex-crud">
              {editing ? (
                <>
                  <EditUserForm
                    editing={editing}
                    setEditing={setEditing}
                    currentUser={currentUser}
                    updateUser={updateUser}
                    isOpen={handOpen}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default PoForm;
