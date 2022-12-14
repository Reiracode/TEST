import React, { useRef } from "react";

const OpenModal = (props) => {
  let ref = useRef(null);
  
  const handleClickOutsides = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      props.onClickOutside();
    }
  };

  const showHideClassName = props.show
    ? "modal-modal"
    : "modal-modal display-none";
  
  return (
    <div className={showHideClassName} onClick={handleClickOutsides}>
      <section className="flex-crud" ref={ref}>
        {props.children}
        <button onClick={props.handleClose}>Close</button>
      </section>
    </div>
  );
};


export default OpenModal;