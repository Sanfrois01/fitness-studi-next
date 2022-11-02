import React, { useRef, useState ,useContext }  from "react";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router"

export const RegisterModal = () => {


  const {toggleModals , modalState, register} = useContext(UserContext);

  const router = useRouter();

  const [ validation , setValidation ] = useState("") 
  

  const inputs = useRef([])
  const addInputs = el => {
    if(el && !inputs.current.includes(el)){
      inputs.current.push(el)
    }
  }

  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault()
    if((inputs.current[1].value.length || inputs.current[2].
      value.length) < 6 ) {
        setValidation("6 characters minimum")
        return;
      } 
      else if (inputs.current[1].value !== inputs.current[2].value){
        setValidation("Les mots de passe ne sont pas identiques")
        return;
    }
      try {
        const cred =  await register(
          inputs.current[0].value,
          inputs.current[1].value
          )
          formRef.current.reset();
          setValidation("")
          router.push("/partners")
          console.log(register)

        }  catch (err){


          if(err.code === "auth/invalid-email") {
            setValidation("Format de l'Email Invalide")
          }
          
          if(err.code === "auth/email-already-in-use") {
            setValidation("Email déja utilisée")
          }

          
        }
      
    }

    const closeModal = () => {
      setValidation("")
      toggleModals("close")
    }


  return (
    <>
    {modalState.RegisterModal && (
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
                <h5 className="modal-title">S'enregister</h5>
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
                    <label htmlFor="signUpEmail"  className="form-label" >Adresse Email
                    </label>
                    <input
                    ref={addInputs}
                    name="email"
                    required 
                    type="email"
                    className="form-control"
                    id="signUpEmail"
                    ></input>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="signUpPwd" className="form-label">Mot de passe
                    </label>
                    <input
                    ref={addInputs}                    
                    name="pwd"
                    required 
                    type="password"
                    className="form-control"
                    id="signUpPwd"
                    ></input>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="repeatPwd" className="form-label">Repeter le Mot de passe
                    </label>
                    <input
                    ref={addInputs}
                    name="pwd"
                    required 
                    type="password"
                    className="form-control"
                    id="repeatPwd"
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
