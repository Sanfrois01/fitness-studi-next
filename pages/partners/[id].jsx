import React, { useContext }  from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router"
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Partner({partner}) {

  const structure = Object.values(partner.structures)
  console.log(partner)
  const {currentUser } = useContext(UserContext);
  const router = useRouter()

  console.log(partner);

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
    <h1 className='display-2 text-center mx-5 py-5'>Partenaire</h1>

      <div className='d-flex flex-wrap justify-content-center'>

          <div className="card" style={{width: '40rem'}}>
            <div className=" display-3 card-header text-center">
            {partner.partner_name}
            </div>
            <ul className="list-group list-group-flush">
              <li className="display-4 list-group-item justify-content-center d-flex">{partner.partner_active ? 
                    <button type="button" className="btn btn-success">Actif</button> : 
                    <button type="button" className="btn btn-danger">Inactif</button> }</li>
              <li className="display-5 list-group-item text-center">{"0"+partner.partner_phone}</li>
              <div className="card-header text-center display-6"> Structures Affiliées</div>
              <li className="display-5 list-group-item d-flex justify-content-evenly">
                <ul>
                  {structure.map((structures) =>{
                    return (
                      <li key={structures.id}>{structures.structure_name}</li>
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
  const url = `${process.env.FITNESS_API}/partners/`;
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
  const paths = partners.map((partner) => ({
    params : {
      id: String(partner.id)
    }
  }));
  return{
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps = async ({params}) => {
  const url = `${process.env.FITNESS_API}/partners/`+params.id;
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

  const partner = await response.json();

  return {
    props : {
      partner
    }
  }  
}