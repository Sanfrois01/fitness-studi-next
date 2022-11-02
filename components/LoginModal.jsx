import React, { useRef, useState ,useContext }  from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router"

export const LoginModal = () => {


  const {toggleModals , modalState, login} = useContext(UserContext);

  const router = useRouter();

  const [ validation , setValidation ] = useState("")
  

  const inputs = useRef([])
  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el);
    }
  }

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault()

      try {
          const cred = await login(
          inputs.current[0].value,
          inputs.current[1].value
          );
          formRef.current.reset();
          setValidation("");
          router.push("/partners")
        }  catch {
          setValidation("Email ou mot de passe incorrect")
        }
        
    }

    const closeModal = () => {
      setValidation("")
      toggleModals("close")
    }


  return (
    <>
    {modalState.LoginModal && (
    <div className="postion-fixed top-0 vw-100 ">
      <div
          onClick={closeModal} 
          className="w-100 h-100 bg-dark bg-opacity-75 ">
      </div>
        <div 
        className="position-absolute top-50 start-50 translate-middle" 
        style={{minWidth:"400px"}}
        >
          <div className="modal-dialog bg-dark bg-opacity-50 border border-dark rounded p-5">

            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Se Connecter</h5>
                  <button 
                  onClick={closeModal} 
                  className="btn-close"></button>
              </div>


              <div className="modal-body ">
                <form
                ref = {formRef} 
                className="sign-up-form"
                onSubmit={handleForm}>
                  

                  <div className="mb-3">
                    <label htmlFor="signInEmail"  className="form-label" >Adresse Email
                    </label>
                    <input
                    ref={addInputs}
                    name="email"
                    required 
                    type="email"
                    className="form-control"
                    id="signInEmail"
                    ></input>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signInPwd" className="form-label">Mot de passe
                    </label>
                    <input
                    ref={addInputs}                    
                    name="pwd"
                    required 
                    type="password"
                    className="form-control"
                    id="signInPwd"
                    ></input>
                    <p className="text-danger mt-1">{validation}</p>
                  </div>

                  <button className="btn btn-primary">Envoyer</button>

                </form>

              </div>

            </div>
          </div>         
        </div>


    </div>
    )}
    </>
  )
}
