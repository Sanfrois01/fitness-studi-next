import React, { useContext }  from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router"
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Structure({structure}) {

  const permission = Object.values(structure.structurePermissions)
  const {currentUser } = useContext(UserContext);
  const router = useRouter()

  const protectedRoutes =  async () => {
      if (!currentUser){
       router.replace("/").then(()=>{
      })
      }
    }
   protectedRoutes()

  


  return (
    <>
    <Header/>
    <main>

    <h1 className='text-center mx-5 py-5'>{structure.structure_name}</h1>

    <div className='d-flex justify-content-center'>

        <div className="card" style={{width: '40rem'}}>
        
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-center display-5">Affilié : {structure.structure_partner.partner_name}</li>
            <li className="list-group-item display-6">Tel : {"0"+structure.structure_phone}</li>
            <li className="list-group-item display-6">Adresse : {structure.structure_address}</li>
            <li className="list-group-item display-6">Code Postal : {structure.structure_postal}</li>
            <div className="card-header text-center display-5">Permissions</div>
            <li className="list-group-item display-6">
              <ul>

                {permission.map((permissions) => {

                  return (
                    <li key={permissions.id}>{permissions.structure_permission_name}</li>
                  )
})}
              
              </ul>
            </li>
          </ul>
        </div>
    </div>



    </main>
    <Footer/>
    </>

    
  )
}

export const getStaticPaths = async () => {
  const url = `${process.env.FITNESS_API}/structure_permissions`;
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
  const paths = structures.map((structure) => ({
    params : {
      id: String(structure.id)
    }
  }));
  return{
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps = async ({params}) => {
  const url = `${process.env.FITNESS_API}/structure_permissions`+params.id;
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

  const structure = await response.json();

  return {
    props : {
      structure
    }
  }  
}