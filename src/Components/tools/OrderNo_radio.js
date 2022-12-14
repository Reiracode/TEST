import React, { useState,useEffect } from "react";
// import styled from "styled-components";
import { useTable, useRowSelect } from "react-table";
import axios from "axios";


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;

      console.log(resolvedRef.current)
    }, [resolvedRef, indeterminate]);
    // console.log(rest.checked)
    //checked: false
    // first_name: "Michael"
    // id: 7
    // last_name: "Lawson"
    if (rest.checked ==  true ) {
      console.log(rest.id)
      

    }



    return (
      <>
        <input type="radio" ref={resolvedRef} {...rest}
        />
      </>
    );
  }
);


function OrderNo_radio(props) {
  const [modal, setModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
 


  function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
  
    const selectedRowIds = [];
    if (selectedRowId) {
      console.log(selectedRowId)
      // selectedRowIds.push(selectedRowId);
      // setnewNO(selectedRowId);
    }

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
      state: { selectedRowPaths }
      // state: { selectedRowIds },

      
    } = useTable(
      {
        columns,
        data,
        // autoResetSelectedRows: false,
        initialState: { selectedRowIds }
      },
      useRowSelect,
      hooks => {
        hooks.visibleColumns.push(columns => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            // Cell: ({ row }) => (
            //   <div>
            //     <IndeterminateCheckbox
            //       // 可get setSelectedRowId value，但是需點二次才有反應
            //       // onClick={() => setSelectedRowId(row.id)}
            //       {...row.getToggleRowSelectedProps()}
            //     />
            //   </div>
            // )

            Cell: ({ value, row, column }) => (
              <div>
                <IndeterminateCheckbox
                  {...row.getToggleRowSelectedProps()}
                  {...row.values}
                />
              </div>
            )

          },
          ...columns
        ]);
      }
      );
    
//prints twice.
    // console.log("prints twice..", selectedFlatRows[0]);
    // const newvalue = selectedFlatRows[0]
    // console.log(newvalue)
    // // setSelectedRowId(selectedFlatRows[0])
    // if (newvalue !== undefined) {
    //   console.log(newvalue.id)
    //   setSelectedRowId(newvalue.id)
    // }
    
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
            {rows.slice(0, 10).map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
        <pre>
          <code>
            {JSON.stringify(
              {
                selectedRowIds: selectedRowIds[0]
              },
              null,
              2
            )}
          </code>
        </pre>
      </>
    );
  }

  const columns = React.useMemo(
    () => [
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
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "id",
            accessor: "id"
          },
          // {
          //   Header: "Visits",
          //   accessor: "visits"
          // },
          // {
          //   Header: "Status",
          //   accessor: "status"
          // },
          // {
          //   Header: "Profile Progress",
          //   accessor: "progress"
          // }
        ]
      }
    ],
    []
  );

  const setOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(!modal);
  };


  const checkButton = (e) => {
    e.preventDefault();
     
    // console.log(selectedFlatRows.id)
    // console.log(selection.length);
    selectedRowId ? props.value(selectedRowId) : props.value("");
    setModal(!modal);
  };
  // const data = React.useMemo(() => makeData(10, 3), []);
  const [data, setData] = useState([]);
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
    <div className="orderno">
              <Table columns={columns} data={data}
                // selectedRows={selectedRows}
                // onSelectedRowsChange={setSelectedRows}
              />
              {/* <p>Selected Rows: {selectedRowKeys.length}</p> */}
            </div>
            <button className="btn btn-light" onClick={setOn}>
              關掉
            </button>
            <button className="btn btn-primary" onClick={checkButton}>
              確定
            </button>
          </div>
        </div>
  ) : null
}
    </>
    
  );
}

export default OrderNo_radio;
