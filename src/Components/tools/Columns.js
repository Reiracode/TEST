import React from "react";
import Select from "react-select";

export const COLUMNS = [
  {
    Header: "FirstName",
    accessor: "FirstName",
    canGroupBy: false,
    disableFilters: true
  },
  {
    Header: "Age",
    accessor: "Age",
    canGroupBy: false,
    disableFilters: true
  },
  // {
  //   Header: "LastName",
  //   accessor: "LastName",
  //   canGroupBy: false,
  //   disableFilters: true,
  //   Cell: () => (
  //     <div style={{ width: "200px" }}>
  //       <Select
  //         //value={selectedOptions}
  //         onChange={() => {}}
  //         options={[
  //           { label: "Nitish", value: "Nitish" },
  //           {
  //             label: "Nivedan",
  //             value: "Nivedan"
  //           }
  //         ]}
  //         isMulti={true}
  //         // note this property.
  //         //menuPortalTarget={document.body}
  //       />
  //     </div>
  //   )
  // },
  {
    Header: "Gender",
    accessor: "Gender",
    canGroupBy: false,
    disableFilters: true
  },
  {
    Header: "Country",
    accessor: "Country",
    canGroupBy: false,
    disableFilters: true
  }

  // {
  //   Header: "Ratio",
  //   accessor: "Ratio",
  //   canGroupBy: false,
  //   disableFilters: true,
  //   Cell: () => <textarea />
  // }
];
