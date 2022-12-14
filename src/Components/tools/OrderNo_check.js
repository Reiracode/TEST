import React, { useState, useEffect } from "react";
import { useTable, useRowSelect } from "react-table";
import axios from "axios";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <>
        {/* <input type="checkbox" ref={resolvedRef} {...rest} value={checked} onChange={handleChange} /> */}
        <input type="checkbox" ref={resolvedRef} {...rest}   />
      </>
    )
  }
)

// function Table({ columns, data, onRowSelectStateChange, onRowClickFunc, checked, handleChange }) {
function Table({ columns, data, onRowSelectStateChange, onRowClickFunc  }) {  
  const {
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
      data,
      initialState: {
        selectedRowIds: {
          "3":true
        }
      },
      stateReducer: (newState, action) => {
        console.log(action.id);

        if (action.type === "toggleRowSelected") {
          newState.selectedRowIds = {
            [action.id]: true
          }
        }
        console.log(newState)
        return newState;
      },
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              {/* <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
              <IndeterminateCheckbox />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // Row-select state change
  useEffect(() => {
     onRowSelectStateChange(selectedRowIds) 

    console.log(selectedRowIds)
    console.log(selectedFlatRows.map((row) => row.original))
    const all = selectedFlatRows.map((row) => row)

    console.log(all)
    // onRowClickFunc(all, all.cell)
    console.log(selectedFlatRows)
   }
  ,
    [onRowSelectStateChange,selectedRowIds]);

 
  // useEffect(() => onRowSelectStateChange(selectedFlatRows.map((row) => row.original))
  //   , [onRowSelectStateChange, selectedFlatRows]);
 
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
                 {/* onClick={handleRowClick(row)}>     */}
                
                {row.cells.map(cell => {
                  // return <td onClick={() => console.info(row.values.id, cell.value)} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  return <td onClick={() => onRowClickFunc(row,cell)} {...cell.getCellProps()}>{cell.render('Cell')}</td>

                  // return <td   {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
 
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}
    </>
  )
}

function OrderNo_check(props) {
  const [checked, setChecked] = React.useState(false);

  const [selectedRowIds, setSelectedRowIds] = React.useState({});
  // console.log('selectedRowIds', selectedRowIds)

  const [modal, setModal] = useState(false);

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

  const setOn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModal(!modal);
  };

  const [clickRowid, setClickRowid] = React.useState({});

  function checkRow(row, cell) {
    console.log(row)
    console.log(cell)
    // console.log(row.values.id)
    // console.log(cell.row.original)
    setClickRowid(row.values.id)

    setChecked(!checked);  

  }

 


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
              <Table
                columns={columns}
                data={data}
                onRowSelectStateChange={setSelectedRowIds}
                onRowClickFunc={checkRow}
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
