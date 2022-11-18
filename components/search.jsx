import React from 'react';
import { useEffect, useState } from "react";

const Search = ({partners}) => {

  const [search, setSearch] = useState ("");

console.log()


  const searchPartners = Object.values("")


  const handleSearchPartners= (e) => {
    let value = e.target.value;
    value.length > 2 && setSearch(value);
  };


  return (
    <>
    <div className="d-flex justify-content-center  ">
      <form className="d-flex">
          <input  className="form-control me-3" 
                  type="search" 
                  placeholder="Rechercher catégorie" 
                  aria-label="Search"
                  onChange={ handleSearchPartners }/>
      </form>
    </div>



    <h2 className='text-center'>{searchPartners}</h2>
  
              
  <div  className='d-lg-flex mx-5 py-5'>
    {searchPartners
    .filter((partner)=> {
      return partner.attributes.url.includes(searchPhotos.toLowerCase());
    })
    .map((image ) => (
      <Images  key={image.id} {...image}/>
    ))}
 
  </div>

    </>
    );
}
export default Search

export const getStaticProps = async () => {
  const url = "https://localhost:8000/api/partners";
  const https = require('https');
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  const response = await fetch(url,{
    headers: {
      'Accept': 'application/json'
    },
    agent: httpsAgent,

    
  });
  const partners = await response.json();

  return {
    props : {
      partners
    }
  }
}