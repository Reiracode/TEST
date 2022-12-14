import React, { useState,useEffect } from 'react'
import Media from './Media'
import About2 from './About2'
import About3 from './About3'
import Singleton, { Recursive } from "../../Singleton";
import axios from "axios";
import './about.css'

const About = () => {
  const today = new Date().toISOString().substring(0, 10);
  const [queryLists, setQueryLists] = useState([])
  let userNo  ='090605'

  useEffect(() => {
    const test = Recursive("221004")
    console.log(test)
    const flowtest = test.map(item => item.name) 
    setQueryLists(flowtest);
    // axios
    //   .get("https://reqres.in/api/users?page=1")
    //   .then((res) => {
    //     const resdata = res.data.data;
    //     const flow = resdata.map(item => item.first_name)
    //     console.log(flow)
    //     setQueryLists(flow);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    
  }, [userNo]);
  
  const dataLists = queryLists.map((item, i) => (
    <div className="flowchart" key={i}>
      <div className="flow_no">
        {item}
        <span className="flowspan"></span>
      </div>
      <div className="flow_approval">
        <p>{today}</p>
        <p>approve</p>
      </div>
    </div>
  ));

  return (
    <section className="container contact">
      <div className="page-2" id="page-about">
        <div className="container">
          <nav>
            <a href="#about1">PAGE1</a>
            <a href="#about2">PAGE2</a>
            <a href="#about3">PAGE3</a>
          </nav>

          <Media />
          <About2 />
          <About3 />

          <div className="flow_container">
            <div className="flowchart">
              <div className="flow_no">
                start
                <span className="flowspan"></span>
              </div>
            </div>
            {dataLists}
            <div className="flowchart">
              <div className="flow_no">
                over
                <span className="flowspan"></span>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

export default About
