import React from 'react'
import Link  from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { signOut } from 'firebase/auth';
import { useRouter } from "next/router"
import { auth } from '../services/firebase-config';

export const SignNavBar = () => {

  const {toggleModals} = useContext(UserContext);

  const router = useRouter();

  const logOut =  async () => {

    try {
      await signOut(auth)
      router.replace('/')
    }catch{
      alert("Probleme survenue lors de la déconnexion")
    }
  }



  return (

    <header>
      <nav className="d-flex navbar navbar-expand navbar-light bg-light px-4 ">
        <div className="container-fluid">
              <Link href="/">
                <a className="navbar-brand">Accueil</a>
              </Link>
        <div className="collapse navbar-collapse" id="navbarNav">  
          <ul className="navbar-nav">



            <div className='d-flex px-4'>
              <li className="nav-item px-4">
                <Link href="#">
                  <button 
                  onClick={()=> toggleModals("login")}
                  className=" btn btn-primary">Connexion</button> 
                </Link>
              </li>
              <li className="nav-item px-4">
                <Link href="#">
                  <button 
                  onClick={()=> toggleModals("register")}
                  className="btn btn-primary">S'enregistrer</button> 
                </Link>
              </li>
              <li className="nav-item px-4">
                <Link href="#">
                  <button
                  onClick={logOut} 
                  className="btn btn-danger">Se deconnecter</button> 
                </Link>
              </li>
            </div>
          </ul>
        </div>
        </div>
      </nav>
    </header>

  )
}
