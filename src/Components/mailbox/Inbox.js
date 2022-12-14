import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import singleton from "../../Singleton";
import axios from "axios";

// flow item list
const Inbox = (props) => {
console.log(props)
  let location = useLocation();
  console.log(location)
 

  // console.log(prop.location.state);
  const assignData = { item: {}, list: [], flow: [] };
  const [flowData, setFlowData] = useState(assignData);
  const [firstName, setFirstName] = useState("");
  const today = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    //approve flow
    const flow = ["010101", "120303", "090605"];

    const item = {
      clyn: "Y",
      datatime: "2022-08-05 12:34:48",
      id: "00563",
      name: "12321312312",
      text1: "2022-08-10",
      text2: "0000000253",
      text3: "",
      username: "123123",
    };

    const list = [
      {
        datatime: "2022-08-05 12:34:48",
        id: "1",
        listno: "00563",
        name: "0000000253",
        price: "s",
        smallp: "kyino",
        username: "鍵盤",
      },
      {
        datatime: "2022-08-05 12:34:48",
        id: "2",
        listno: "00563",
        name: "0000000253",
        price: "大",
        smallp: "tesco",
        username: "滑鼠",
      },
    ];

    // if (prop.location.state !== null) {
      axios
        .get(`https://reqres.in/api/users/2`)
        .then((res) => {
          console.log(res.data.data);
          const data = res.data.data;
          console.log(data);
          setFlowData({
            ...flowData,
            item: item,
            list: list,
            flow: flow
          });

        })

  }, [props]);

  // 單身
  const resultTable = flowData.list.map((item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index}</th>
        <td>{item.name}</td>
        <td>{item.username}</td>
        <td>{item.price}</td>
      </tr>
    );
  });

  //簽核流程array
  const dataLists = flowData.flow.map((item, i) => (
    <div className="flowchart" key={i}>
      <div className="flow_no">
        {item}
        <span className="flowspan"></span>
      </div>
      <div className="flow_approval">
        <p>{today}</p>
        <p>approve</p>
      </div>
    </div>
  ));

  //簽核同意
  const handleSubmit = (evt) => {
    evt.preventDefault();
    var data = { assing: firstName, listno: props.location.state.listno };
    console.log(JSON.stringify(data));

    var url = singleton.domainName + "/sys_flow_approve.php";
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      {/* {prop.location.state === undefined || prop.location.state === null ?
        ( */}
        {/* <section className="container contact">
          <h1>沒有資料</h1>
        </section>
      ) : ( */}
        <section className="container contact">
          <h1>收件匣{flowData.item["id"]}</h1>
          <div className="flex_form">
            <span>{flowData.item["name"]}</span>
            <div className="flex-large">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputUsername">員工姓名</label>
                  <input
                    type="text"
                    defaultValue={flowData.item["name"]}
                    readOnly
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="inputUsername">員工部門</label>
                  <input
                    type="text"
                    defaultValue={flowData.item["username"]}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputUsername">需用時間</label>
                  <input
                    type="text"
                    defaultValue={flowData.item["text1"]}
                    readOnly
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="inputUsername">請購單號</label>
                  <input
                    type="text"
                    defaultValue={flowData.item["text2"]}
                    readOnly
                  />
                </div>
              </div>

              <input
                name="firstName"
                onChange={(e) => {
                  setFirstName(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <button onClick={handleSubmit}>Approve</button>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">-</th>
                <th scope="col">no</th>
                <th scope="col">描述</th>
                <th scope="col">尺寸</th>
              </tr>
            </thead>
            <tbody>{resultTable}</tbody>
          </table>

          <div className="container">
            <h3>簽核流程</h3>
            <div className="flow_container">
              <div className="flowchart">
                <div className="flow_no">
                  start
                  <span className="flowspan"></span>
                </div>
              </div>
              {dataLists}
              <div className="flowchart">
                <div className="flow_no">
                  over
                  <span className="flowspan"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      {/* )} */}
    </>
  );
};

export default Inbox;
