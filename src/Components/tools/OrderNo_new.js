import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination, useRowSelect, useMountedLayoutEffect } from "react-table";
import axios from "axios";
import { useAuthState } from "../../Context";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./Columns";
import { Check } from "./Check";

export const OrderNo_new = (props) => {
  const { userno } = useAuthState();
  const [modal, setModal] = useState(false);
  const [lists, setLists] = useState([]);
  const setOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(!modal);
  };
  const checkButton = (e) => {
    e.preventDefault();
    // console.log(selection.length);
    // selection.length ? props.value(selection[0]) : props.value("");
    console.log(selectedRows)
    // console.log(selection.length);
    selectedRows ? props.value(Object.keys(selectedRows)[0]) : props.value("");
    setModal(!modal);
  };
  const firstNames = ["jane", "john", "alex"];
  const lastName = ["smith", "jones"];
  const [data, setData] = useState([]);
  // const data = Array(10)
  //   .fill()
  //   .map(a => ({
  //     firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
  //     lastName: lastName[Math.floor(Math.random() * lastName.length)],
  //     age: Math.ceil(75 * Math.random())
  //   }));
  // console.log(data)
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
  

  const [selectedRows, setSelectedRows] = useState({});
  const selectedRowKeys = Object.keys(selectedRows);


  const columns = React.useMemo(() => [
    {
      id: "selection",
      // The header can use the table's    method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }) => (
        <div>
          <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
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
        }
      ]
    },
    {
      Header: "Other Info",
      columns: [
        {
          Header: "id",
          accessor: "id"
        }
      ]
    }

  ]);

  // const columns = [
  //   {
  //     Header: "Name",
  //     columns: [
  //       {
  //         Header: "First Name",
  //         accessor: "first_name"
  //       },
  //       {
  //         Header: "Last Name",
  //         accessor: "last_name"
  //       }
  //     ]
  //   },
  //   {
  //     Header: "Other Info",
  //     columns: [
  //       {
  //         Header: "id",
  //         accessor: "id"
  //       }
  //     ]
  //   }
  // ];

  const Table = ({ selectedRows, columns, data, onSelectedRowsChange }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      // prepareRow,

      rows,
      prepareRow,
      state: { selectedRowIds },
      
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize }
    } = useTable(
      {
        columns,
        data,
        // initialState: { pageIndex: 0 }
          initialState: {
          selectedRowIds: selectedRows
        }
      },
      usePagination,
      useRowSelect
      );
    
    useMountedLayoutEffect(() => {
      console.log("SELECTED ROWS CHANGED", selectedRowIds);
      onSelectedRowsChange && onSelectedRowsChange(selectedRowIds); 
    }, [onSelectedRowsChange, selectedRowIds]);
 

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
            {page.map((row, i) => {
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
        <div className="table_footer">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "500px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
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
            {/* <button onClick={logSelection}>Log Selection</button> */}
            <div className="App">
              <Table columns={columns}
                data={data}

                selectedRows={selectedRows}
                onSelectedRowsChange={setSelectedRows}
         
              />
            </div>

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
export default OrderNo_new;
