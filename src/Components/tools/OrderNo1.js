import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
// import "react-table/react-table.css";
import Singleton from "../../Singleton";

const CheckboxTable = checkboxHOC(ReactTable);
const OrderNo = (props) => {
  const [modal, setModal] = useState(false);
  const [lists, setLists] = useState([]);

  // get order no
  const ORDERNO_URL = `${Singleton.domainName}/order_query_item.php`;
  const setOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(!modal);
  };

  useEffect(() => {
    (async () => {
      // const data = await fetch(ORDERNO_URL);
      // const results = await data.json();

      const data = await fetch("https://reqres.in/api/users?page=1");
      const json = await data.json();
      const results = json.data;

      // console.log(results)
      setLists(results);
    })();
  }, [ORDERNO_URL]);

  //--------------------json array
  const getData = () => {
    // console.log(lists);
    const data = lists.map((item) => {
      const _id = item.id;
      return {
        _id,
        ...item,
      };
    });
    return data;
  };

  const getColumns = (data) => {
    const columns = [];
    const sample = data[0];

    for (let key in sample) {
      if (sample.hasOwnProperty(key)) {
        if (key !== "_id") {
          columns.push({
            accessor: key,
            Header: key,
          });
        }
      }
    }
    return columns;
  };

  const data = getData();
  const columns = getColumns(data);
  const [selection, setSelection] = useState([]);

  //only one checkd
  const toggleSelection = (key) => {
    const keyIndex = selection.indexOf(key);
    //already exists shift & push
    const _tempSelection = [...selection];
    if (keyIndex >= 0) {
      _tempSelection.shift(key);
    } else {
      if (selection.length > 0) {
        _tempSelection.shift(key);
      }
      // it does not exist so add it
      _tempSelection.push(key);
    }
    setSelection(_tempSelection);
  };

  //return true/false
  const isSelected = (key) => {
    // console.log("isSelekcted-key"+key)
    // 1027
    return selection.includes(`${key}`);
    // return selection.includes(`select-${key}`);
  };

  const logSelection = () => {
    console.log(selection);
  };

  const checkButton = (e) => {
    e.preventDefault();
    console.log(selection.length);
    selection.length ? props.value(selection[0]) : props.value("");
    setModal(!modal);
  };

  const iniPage = { pageSize: 5, page: 0 };
  const [ccPage, setCcpage] = useState(iniPage);
  const [checkRow, setCheckRow] = useState();
  const checkboxProps = {
    isSelected,
    toggleSelection,
    selectType: "checkbox",
    getTrProps: (s, r) => {
      if (r && r.row) {
        // const selected = isSelected(r.original._id);
        return {
          onClick: (e) => {
            // 1027
            toggleSelection(`${r.original._id}`);
            isSelected(`${r.original._id}`);
            setCheckRow(r.index);
            // 選定的no
            console.log(`${r.original._id}`);
          },
          style: {
            backgroundColor: r.index === checkRow ? "#e3f2fa" : "inherit",
          },
        };
      }
    },
  };

  return (
    <>
      <button className="btn btn-outline-secondary btn_line" onClick={setOn}>
        請購NO
      </button>
      {modal ? (
        <div className="modal-modal" onClick={setOn}>
          <div
            className="popup_inner"
            onClick={(event) => event.stopPropagation()}
          >
            <button onClick={logSelection}>Log Selection</button>
            <CheckboxTable
              className="ts"
              onClick={checkButton}
              keyField="_id"
              previousText={"上一頁"}
              nextText={"下一頁"}
              data={data}
              columns={columns}
              defaultPageSize={5}
              page={ccPage.page}
              onPageChange={(page) => setCcpage({ ...ccPage, page: page })}
              {...checkboxProps}
            />

            <button className="btn btn-light" onClick={setOn}>
              關掉
            </button>
            <button className="btn btn-primary" onClick={checkButton}>
              確定
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OrderNo;
