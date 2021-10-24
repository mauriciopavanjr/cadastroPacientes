import React, {useState, useEffect} from "react"
import './App.css';
import Axios from "axios";
import Card from "./components/cards/card";

function App() {
  const [values, setValues] = useState();
  const [listPatient, setListPatient] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      birth: values.birth,
      email: values.email,
      address: values.address,
    }).then((response)=> {
        console.log(response)
    });
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response)=> {
      setListPatient(response.data)
    });
  }, []);


  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title"> New Patient Register</h1>
        <input 
          type="text"
          name="name"
          placeholder="Name"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input 
          type="text"
          name="birth"
          placeholder="Birth Date"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input 
          type="text"
          name="email"
          placeholder="E-mail"
          className="register-input"
          onChange={handleChangeValues}
        />
        <input 
          type="text"
          name="address"
          placeholder="Address"
          className="register-input"
          onChange={handleChangeValues}
        />
        <button className="register-button" onClick={handleClickButton}>Register</button>
      </div>
      <h1 className="list-register">Registered Patient List</h1>
      {typeof listPatient !== "undefined" && listPatient.map((value)=> {
        return <Card 
        key={value.id} 
        listCard={listPatient} 
        setlistCard={setListPatient} 
        id={value.id}
        name={value.name}
        birth={value.birth}
        email={value.email}
        address={value.address}
        ></Card>
      })}
      
    </div>
  );
}

export default App;
