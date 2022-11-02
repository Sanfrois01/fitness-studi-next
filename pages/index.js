import React , {useContext} from "react";
import Image from "next/future/image";
import { RegisterModal } from "../components/RegisterModal";
import { LoginModal } from "../components/LoginModal";
import fitnessHome from '../public/fitness_home.jpg';
import { SignNavBar } from "../components/SignNavBar";
import { UserContext } from "../context/UserContext";


export default function Home() {
  
  const {currentUser} = useContext(UserContext);


  return (
    <>    
    <div className="bgWrap">
    <Image
    src={fitnessHome}
    alt="Fitness Studi"
    className="bgWrap"
    quality={100}
    />
    <SignNavBar/>
      <h1 className="text-center display-3 p-5">
        {currentUser ? "Salut Collegue" : "Fitness Studi"}</h1>  
    <RegisterModal/>
    <LoginModal/>
    
    </div>
    </>

    
  
    
  )
}


