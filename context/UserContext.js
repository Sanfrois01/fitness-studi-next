import { createContext , useState , useEffect } from "react";
import{
  signInWithEmailAndPassword ,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"
import { auth } from "../services/firebase-config";

export const UserContext = createContext()

export function UserContextProvider(props){

  const register = (email ,pwd) => createUserWithEmailAndPassword(auth, email,pwd);
  const login = (email ,pwd) => signInWithEmailAndPassword(auth, email,pwd);

  
  const [currentUser , setCurrentUser] = useState();
  const [loadingData , setLoadingData] = useState(true);
  
  
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingData(false)
    })

    return unsubscribe;

  },[]);
  //modal 

  const [modalState, setModalState] = useState({
   RegisterModal :   false,
   RegisterModal :   false
  })

  const toggleModals = modal => {
    if( modal === "login") {
      setModalState({
        RegisterModal : false,
        LoginModal:     true
      })
    }
    if( modal === "register") {
      setModalState({
        RegisterModal : true,
        LoginModal:     false
      })
    }
    if( modal === "close") {
      setModalState({
        RegisterModal : false,
        LoginModal:     false
      })
    }
  }

  return(
    <UserContext.Provider value={{modalState,toggleModals, register,currentUser,login, loadingData}}>
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}