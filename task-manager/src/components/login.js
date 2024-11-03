import React from "react";
import princialImg from "../assets/img/banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import * as CONSTANTS from "../global/constants";
import LoaderComponent from "./loader";


class LoginComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      mail: "",
      pass: "",
    };
  }

  componentDidMount() {
    //sessionStorage.remove('acc_tk')
  }

  handleChange = (event) => {
    let partialState = {};
    partialState[event.target.name] = event.target.value;
    this.setState(partialState);
  };

  sendLogin = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    try {
      let config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };

      await fetch(
        `${CONSTANTS.BASE_URL}${CONSTANTS.ENDPOINTS.LOGIN}`,
        config
      ).then((res) => {
        console.log(res);
        this.setState({
          loading: false,
        });
        if (res.ok) {
          res.json().then((json) => {
            console.log(json);
            sessionStorage.setItem("acc_tk", json.acc_tk);
          });
        } else {
          res.json().then((json) => {
            alert(json.err);
          });
        }
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    if (this.state.loading) {
      return <LoaderComponent />;
    } else {
      return (
        <section className="login-container">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src={princialImg} className="img-fluid" alt="banner" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form autoComplete="off" onSubmit={this.sendLogin}>
                  <div className="mb-4">
                    <h3>
                      <FontAwesomeIcon icon={faReact} className="me-2" />
                      TaskManager
                    </h3>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="form3Example3">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      name="mail"
                      onChange={this.handleChange}
                      value={this.state.mail}
                    />
                  </div>

                  <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      name="pass"
                      onChange={this.handleChange}
                      value={this.state.pass}
                    />
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary btn-lg px-3"
                    >
                      Login
                    </button>
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
      );
    }
  }
}

export default LoginComponent;