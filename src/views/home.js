import React, { useState, useEffect } from 'react';

function Home() {
  const [error, setError] = useState(null);
  // const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const projects = [
    {
      "id": "0",
      "title": "data application project",
      "cover": "",
      "desc": "I was tasked to output data from a JSON file through a web application, using React. I decided to make a visualization depicting four of my favorite Aphex Twin albums, as well as the tracklist/description of the chosen album, along with playable tracks.",
      "tech": "React.js, JSON, Node.js, GitHub Pages",
      "url1": "https://mramirez0610.github.io/project2repo/",
      "url2": "https://github.com/mramirez0610/project2repo"
    },
    {
      "id": "1",
      "title": "landing page",
      "cover": "",
      "desc": "As a personal project, I took it upon myself to create a landing page that followed the layout of CMS's, such as Carrd.co or LinkTree, that allow you to create simple landing pages using premade HTML and CSS components. Though it's simple, I plan to add more to it in the future.",
      "tech": "HTML, CSS, p5.js",
      "url1": "https://mramirez0610.github.io/landing/",
      "url2": "https://github.com/mramirez0610/landing"
    },
    {
      "id": "2",
      "title": "portfolio page",
      "cover": "",
      "desc": "You're here right now! I decided to create this page as a central source that displays all my Front-End endeavors. I made this site using React, as well as React-Router. I wanted to heavily focus on responsive design this project, and I feel that it translates nicely to mobile.",
      "tech": "React, React-Router, JSON, Github Pages",
      "url1": "https://mramirez0610.github.io/portfolio",
      "url2": "https://github.com/mramirez0610/portfolio"
    }
  ]


  const projectList = projects.map((p) => (
    <div className="card" key={p.id}>
      <h1 className='heading'>{p.title}</h1>
      <p>{p.desc}</p>
      <p>Technology used: {p.tech}</p>
      <a href={p.url1}>live version</a> | <a href={p.url2}>github</a>
    </div>
  ));


  return (
    <div className="container">
      {projectList}
      <h1>HOME</h1>
    </div>
  );
}

export default Home;