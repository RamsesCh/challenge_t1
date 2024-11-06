import React, { useEffect, useState } from 'react';
import princialImg from "../assets/img/banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import * as CONSTANTS from "../global/constants";
import LoaderComponent from "./loader";
import { useNavigate } from "react-router-dom";


function LoginComponent (props){

  const [loading, setLoading] = useState();
  const [mail, setMail] = useState();
  const [pass, setPass] = useState();
  const [errLogin = false, setErrLogin] = useState();
  const navigate = useNavigate();

  const mailChange = (e) => {
    setMail(e.target.value);
  };

  const passChange = (e) => {
    setPass(e.target.value);
  };

  const sendLogin = async (e) => {
    e.preventDefault();
    setErrLogin(false);
    setLoading(true);

    const data = {
      "mail": mail.trim(),
      "pass": pass.trim(),
    }
    try {
      let config = {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      await fetch(`${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.AUTH}`, config).then((res) => {
        setLoading(false);
        if (res.ok) {
          setErrLogin(false);
          res.json().then((json) => {
            sessionStorage.setItem("acc_tk", json.acc_tk);
            props.logged(true);
            navigate("/tasks");
          });
        } else {
          setErrLogin(true);
        }
      });
    } catch (error) {
      setLoading(false);
      alert(error.error)
    }
  };

  useEffect(() => {
    sessionStorage.removeItem('acc_tk');
  }, []);

  return (
    <div>
      {loading ? <LoaderComponent /> : ""}
      <section className="login-container">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={princialImg} className="img-fluid" alt="banner" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form autoComplete="off" onSubmit={sendLogin}>
                <div className="mb-4">
                  <h3>
                    <FontAwesomeIcon icon={faReact} className="me-2" />
                    TaskManager
                  </h3>
                </div>
                <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg rounded-1"
                    onChange={mailChange}
                  />
                </div>

                <div data-mdb-input-init className="form-outline mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg rounded-1"
                    onChange={passChange}
                  />
                </div>
                {errLogin ? (
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <div class="alert alert-danger" role="alert">
                      Email y/o Password incorrectos, por favor intentalo de
                      nuevo.
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary btn-lg px-3 rounded-1"
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    ¿Aun no eres usuario?{" "}
                    <a href="#!" className="link-danger">
                      Registrar
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-100 mb-3 py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            TaskManager 2024 by RamsesCh.
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginComponent;