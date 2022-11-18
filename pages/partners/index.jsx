import Link from 'next/link';
import Header from '../../components/header';
import React, { useContext, useState }  from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router"



export default  function Partners({partners}) {

  const {currentUser , loadingData } = useContext(UserContext);
  const router = useRouter()

  const protectedRoutes =  async () => {
      if (!currentUser && !loadingData){
       router.push("/").then(()=>{
      })
      }
    }
     protectedRoutes()


     //Rechercher un Partenaire

  const [searchPartners, setSearchPartners] = useState ("");

  const handleSearchPartners= (e) => {
    let value = e.target.value;
    value.length > 2 && setSearchPartners(value);
  };





 
  return  (


    
  <>
<div>
  <Header/>
    <main>
      <h1 className='text-center mx-5 py-5'>Les Partenaires</h1>

      <div className="d-flex justify-content-center py-5 ">
      <form className="d-flex">
          <input  className="form-control me-3" 
                  type="search" 
                  placeholder="Rechercher un Partenaires" 
                  aria-label="Search"
                  onChange={ handleSearchPartners }/>
      </form>
      </div>




      <div className='d-flex flex-wrap justify-content-center'>
          { partners 
          .filter((val) => {
          return (
            val.partner_name.toLowerCase().includes(searchPartners)
            )
          })
          .map(val =>{
            return (
              <div className='card m-5 p-5 col-6' key={val.id}>

              <span >
                <div className='p-4 m-4'>
                <h2 className='text-center'>{val.partner_name}</h2>
                  <h3 className='text-center'> {val.partner_active ? 
                    <button type="button" className="btn btn-success">Actif</button> : 
                    <button type="button" className="btn btn-danger">Inactif</button> }
                  </h3>
                    <Link href={"partners/"+val.id} >
                      <a className="d-flex justify-content-center text-center">Detail</a>
                    </Link>
                </div>
              </span>
              </div>
);
})}
      </div>
    </main>
    </div>
</>

  );
}

export const getStaticProps = async () => {
  const url = `${process.env.FITNESS_API}/partners`;
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