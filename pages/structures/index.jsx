import Link from 'next/link';
import Header from '../../components/header';
import React, { useContext , useState }  from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router"


export default function structures({structures}) {

  const {currentUser } = useContext(UserContext);
  const router = useRouter()

  const protectedRoutes =  async () => {
      if (!currentUser){
       router.replace("/").then(()=>{
      })
      }
    }
   protectedRoutes()

   const [searchStructures, setSearchStructures] = useState ("");

   const handleSearchStructures= (e) => {
     let value = e.target.value;
     value.length > 2 && setSearchStructures(value);
   };
 
  return (
    <>

    <Header/>
    <main>
    <h1 className='text-center mx-5 py-5'>Les Structures</h1>

    <div className="d-flex justify-content-center py-5 ">
      <form className="d-flex">
          <input  className="form-control me-4" 
                  type="search" 
                  placeholder="Rechercher une Structure" 
                  aria-label="Search"
                  onChange={ handleSearchStructures }/>
      </form>
      </div>





        <div className='d-flex flex-wrap justify-content-center'>
          { structures
          .filter((val)=> {
            return(
              val.structure_name.toLowerCase().includes(searchStructures)
            )
          }) 
          .map(val =>{
            return (
              <div >
              <span  key={val.id}>
                <h2 className='text-center mx-5 px-5'>{val.structure_name}</h2>
                <h3 className='text-center'> {val.structure_active ? 
                    <button type="button" className="btn btn-success">Actif</button> : 
                    <button type="button" className="btn btn-danger">Inactif</button> }
                  </h3>
                <Link href={"structures/"+val.id} >
                      <a className="d-flex justify-content-center text-center">Detail</a>
                </Link>
              </span>
              </div>

            );
          })}
        </div>
    </main>
    </>
  );
}

export const getStaticProps = async () => {
  const url = `${process.env.FITNESS_API}/structures/`;
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

  const structures = await response.json();

  return {
    props : {
      structures
    }
  }
}