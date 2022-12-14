import React, { useState, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import axios from "axios";

const IndeterminateCheckbox = React.forwardRef(
  // ({ indeterminate, checked, name, ...rest }, ref) => {
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    // const defaultRef = React.useRef(checked);
    const resolvedRef = ref || defaultRef
    // console.log(resolvedRef.current) 

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
      // resolvedRef.current.checked = checked;
      // console.log(checked)
    }, [resolvedRef, indeterminate])

    return (
      <>
        {/* <input type="checkbox" ref={resolvedRef} {...rest}   /> */}
        <input type="checkbox" ref={resolvedRef}
          name={name}
          id={name}
          // checked={true}
          //就可以checkbox 可顯示checked
          checked={checked}
          {...rest} />
      </>
    )
  }
)

function MyTable({ columns, data, onRowSelectStateChange, onRowClickFunc, handleCheckboxStateChange }) {
  const {
    isSelected,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps}    ) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }, handleCheckboxStateChange) => (
            <div>
              {/* <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} /> */}
              <IndeterminateCheckbox
                name={row.original.id}
                checked={handleCheckboxStateChange}
                {...row.getToggleRowSelectedProps()}
              />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // Row-select state change
  // useEffect(() => onRowSelectStateChange(selectedRowIds),
  //   [onRowSelectStateChange,selectedRowIds]);

  useEffect(() => { 
    onRowSelectStateChange(selectedFlatRows.map((row) => row.original))

    onRowClickFunc(selectedFlatRows)
    // handleCheckboxStateChange(selectedFlatRows.map((row) => row.original))
    console.log(selectedFlatRows)

    const test = selectedFlatRows.map((row) => row.original)
    console.log(test)
  }
    , [onRowSelectStateChange, selectedFlatRows]);
  
  // Render the UI for your table
  return (  
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, 10).map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} >                
                {row.cells.map(cell => {
                  // return <td onClick={() => onRowClickFunc(row, cell)} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td> 
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

function OrderNo_check(props) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'first_name',
          },
          {
            Header: 'Last Name',
            accessor: 'last_name',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'id',
            accessor: 'id',
          }
        ],
      },
    ],
    []
  )

  const [modal, setModal] = useState(false);
  //checkobx 的狀態，希望row click時，就check TRUE
  const [checked, setChecked] = React.useState(false);

  //勾選chekcbox
  const [selectedRowIds, setSelectedRowIds] = React.useState({});
  //clickrow  : click row時就可以回傳
  const [clickRowid, setClickRowid] = React.useState({});

  const setOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(!modal);
  };

  function  getRowId(row, cell) {
    console.log(row)
    console.log(cell)
    // console.log(cell.row.original)
    setClickRowid(row.values.id)
    setChecked(!checked)
  }

  // const checkRowClick = (row) => {
  //   console.log(checked)
  //   console.log(row.values.id)
  // }

// 「確定」之後，回傳id=>selectedRowIds:勾選 /clickRowid: click row時就可以回傳
  const checkButton = (e) => {
    e.preventDefault();
    console.log(clickRowid)
    console.log(selectedRowIds)
    selectedRowIds ? props.value(clickRowid || selectedRowIds) : props.value("");
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
        請購NO_check
      </button>
      {modal ? (
        <div className="modal-modal" onClick={setOn}>
          <div
            className="popup_inner"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="orderno">
              <MyTable
                columns={columns}
                data={data}

                onRowSelectStateChange={setSelectedRowIds}

                onRowClickFunc={getRowId}
                
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
      ) : null
      }
    </>

  );
}

export default OrderNo_check;
