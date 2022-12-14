import React from "react";


function Banner() {
  const socials = [
    {
      "id": "0",
      "name": "github",
      "img": "svgs/github.svg",
      "url": "https://github.com/mramirez0610"
    },
    {
      "id": "2",
      "name": "linkedIn",
      "img": "svgs/linkedin.svg",
      "url": "https://www.linkedin.com/in/marco-ramirez-01a3611aa"
    }
  ];

  const SocialComp = socials.map((o) => (
    <a href={o.url} key={o.id} >
      <img className="icon" src={o.img} alt="social-icon" />
    </a>
  ));

  return (
    <div>
      <div className="banner">

        {SocialComp}
      </div>
    </div>
  );
}

export default Banner;