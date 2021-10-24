import React from "react"
import './card.css';
import FormDialog from "../dialog/dialog";

export default function Card(props){

    const [open, setOpen] = React.useState(false);

    const handleCLickCard = () => {
        setOpen(true);
     };




    return (
        
        <><FormDialog 
        open={open} 
        setOpen={setOpen} 
        name={props.name} 
        birth={props.birth} 
        email={props.email} 
        address={props.address} 
        listCard={props.listCard} 
        setlistCard={props.setlistCard} 
        id={props.id}></FormDialog>
        <div className="card-container" onClick={()=> handleCLickCard()}>
            <h1 className="card-name">{props.name}</h1>
            <p className="card-birth">{props.birth}</p>
            <p className="card-email">{props.email}</p>
            <p className="card-address">{props.address}</p>
        </div></>
    );
}