import React, { useState ,useEffect} from "react";
import ReactDOM ,{ createPortal } from 'react-dom';
// https://www.fooish.com/reactjs/portal.html
//Hooks https://www.jayfreestone.com/writing/react-portals-with-hooks/
//https://stackoverflow.com/questions/53595935/how-can-i-make-react-portal-work-with-react-hook
// https://medium.com/@jc_perez_ch/dynamic-react-portals-with-hooks-ddeb127fa516

const HookModal = ({ children }) => {
  // const el = document.createElement("div");
  const [containerEl] = useState(document.createElement('div'));
  useEffect(() => {
    const portalRoot = document.getElementById("portal");

    if (!portalRoot) {
      const tempEl = document.createElement('div');
      tempEl.id = 'portal';
      document.body.append(tempEl);
      portalRoot = tempEl;
    }
    // Append modal container to root
    portalRoot.appendChild(containerEl);
    return function cleanup() {
      // On cleanup remove the modal container
      portalRoot.removeChild(containerEl);
    };

  }, [])

  // <- The empty array tells react to apply the effect on mount/unmount
  // return createPortal(children, el);

  return ReactDOM.createPortal(children, containerEl);
};




export default HookModal