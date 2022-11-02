import Link  from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';

const Header = () =>  {



  const router = useRouter();

  const logOut =  async () => {

    try {
      await signOut(auth)
      router.push('/')
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
            <li className="nav-item">
              <Link href="/partners">
                <a className="nav-link ">Partenaires</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/structures">
                <a className="nav-link ">Structures</a> 
              </Link>
            </li>

            <div className='d-flex px-4'>


              <li className="nav-item px-4">
              <Link href="/">
                  <button
                  onClick={() => logOut} 
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



export default Header;