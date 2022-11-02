import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContextProvider } from '../context/UserContext';
import React , {useContext} from "react";



export default function MyApp({ 
  Component, 
  pageProps : { ...pageProps}
 }) {

return (
  <>  
      <UserContextProvider>
          <Component {...pageProps} />
      </UserContextProvider>
  </>
  )
}

