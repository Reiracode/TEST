// 將函式轉為es2016類別;
class Getname {
  constructor(params) {
    let loc = params.indexOf(":", 6);
    this.domainName = params.slice(0, loc) + ":8080/reirasys_api";
  }
}
const Singleton = new Getname(window.location.href);
// const Singleton = {
//   domainName: domainName,
// };

// export const domainName = createContext(initialState);
export default Singleton;

// class Singleton {
//   constructor () {
//     this.domainName = window.location.href
//     const loc = this.domainName.indexOf(':', 6)
//     this.domainName = this.domainName.slice(0, loc) + ":8080"

//   }
// }
// const singleton = new Singleton
// export default singleton

// const Singleton = () => {
//   let domainName = window.location.href;
//   let loc = domainName.indexOf(":", 6);
//   domainName = domainName.slice(0, loc) + ":8080";
//   // return domainName;

// };
// export default Singleton ;

export function Recursive(id) {
  // const depts = [
  //   { id: "TP000", name: "BOSS", up_dep: "no" },
  //   { id: "TP001", name: "AUO", up_dep: "TP000" },
  //   { id: "TP002", name: "MIS", up_dep: "TP001" },
  //   { id: "TP003", name: "FA", up_dep: "TP001" },
  //   { id: "TP031", name: "FAA", up_dep: "TP003" },
  //   { id: "TP021", name: "MISA", up_dep: "TP002" },
  //   { id: "TP022", name: "MISA", up_dep: "TP002" },
  // ];

  const depts = [
    { id: "000001", name: "John", up_dep: "no" },
    { id: "000101", name: "Romy", up_dep: "000001" },
    { id: "000201", name: "Celia", up_dep: "000101" },
    { id: "000301", name: "Mary", up_dep: "000101" },
    { id: "001101", name: "John", up_dep: "000301" },
    { id: "001101", name: "Akane", up_dep: "001101" },
    { id: "221004", name: "Reira", up_dep: "000201" },
  ];
  function topParent(id) {
    let path,item = { id: id, name: "" };
    let obj = depts.find((v) => {
      item.name = v.name;
      return v.id == id;
    });
    // console.log(obj);
    if (obj.up_dep == "no") {
      return [item];
    } else {
      path = topParent(obj.up_dep);
    }
    // console.log([item, ...path]);
    return path && [item, ...path];
  }
  // let s = topParent("TP003");

  return topParent(id);
}
 