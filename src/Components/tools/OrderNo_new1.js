import React, { useState,useEffect } from "react";
// import styled from "styled-components";
import { useTable, useRowSelect, useMountedLayoutEffect } from "react-table";
import axios from "axios";

const Table =({ columns, data, selectedRows, onSelectedRowsChange }) =>{
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowIds }
  } = useTable(
    {
      columns,
      data,
      initialState: {
        selectedRowIds: selectedRows
      }
      // state: {
      //   selectedRowIds: selectedRows
      // }
    },
    useRowSelect
  );

  // Keep parent/store state in sync with local state
  // No need to update on mount since we are passing initial state
  useMountedLayoutEffect(() => {
    console.log("SELECTED ROWS CHANGED", selectedRowIds);

    onSelectedRowsChange && onSelectedRowsChange(selectedRowIds);
  }, [onSelectedRowsChange, selectedRowIds]);

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>
    </>
  );
}

const OrderNo_new1 = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

  const setOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(!modal);
  };

  const checkButton = (e) => {
    e.preventDefault(); 
     console.log(selectedRows)
    // console.log(selection.length);
    selectedRows ? props.value(Object.keys(selectedRows)[0]) : props.value("");
    setModal(!modal);
  };

  const columns = React.useMemo(
    () => [
      // Let's make a column for selection
      {
        id: "selection",
        // The header can use the table's    method
        // to render a checkbox
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" name={getToggleAllRowsSelectedProps?true:false} {...getToggleAllRowsSelectedProps()}    />
          </div>
        ),
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        )
      },
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "first_name"
          },
          {
            Header: "Last Name",
            accessor: "last_name"
          },
          {
            Header: "Id",
            accessor: "id"
          },
        ]
      },
      // {
      //   Header: "Info",
      //   columns: [
      //     {
      //       Header: "Age",
      //       accessor: "id"
      //     },
           
      //   ]
      // }
    ],
    []
  );


  const getData = async () => {
    const { data } = await axios.get(`https://reqres.in/api/users?page=2`);
    const resdata = data.data;
    var search = ['first_name', 'last_name', 'id'];
    let newdata = [];
    for (var i = 0; i < resdata.length; i++) {
      var filters = Object.keys(resdata[i])
        .filter(key => search.includes(key))
        .reduce((obj, key) => {
          obj[key] = resdata[i][key];
          return obj;
        }, {});
      newdata.push(filters)
    }
    console.log(newdata)
    setData(newdata)
    console.log(newdata)

  };

  
  useEffect(() => {
    getData();
  }, []);
  
  const [selectedRows, setSelectedRows] = useState({  });

  const selectedRowKeys = Object.keys(selectedRows);
  console.log(selectedRowKeys)

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
         
         
          <Table
            columns={columns}
            data={data}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
          />
          <p>Selected Rows: {selectedRowKeys.length}</p>
          <pre>
            <code>
              {JSON.stringify(
                {
                  selectedRowKeys
                },
                null,
                2
              )}
            </code>
            </pre>
            
          </div>
        
          <button className="btn btn-light" onClick={setOn}>
            關掉
          </button>

          <button className="btn btn-primary" onClick={checkButton}>
            確定
          </button>
        </div>

      ) : null}
    </>
  );
}

export default OrderNo_new1;
