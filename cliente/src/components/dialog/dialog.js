import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {



    const handleClose = () => {
        props.setOpen(false);
    };

  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    birth: props.birth,
    email: props.email,
    address: props.address,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleEditPatient = () => {
      console.log(editValues.address)
    Axios.put("http://localhost:3001/edit", {
      id: editValues.id,
      name: editValues.name,
      birth: editValues.birth,
      email: editValues.email,
      address: editValues.address,
    }).then(() => {
      props.setlistCard(
        props.listCard.map((value) => {
          return value.id === editValues.id
            ? {
                id: editValues.id,
                name: editValues.name,
                birth: editValues.birth,
                email: editValues.email,
                address: editValues.address
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeletePatient = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setlistCard(
        props.listCard.filter((value) => {
          return value.id !== editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Patient Name"
            defaultValue={props.name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="birth"
            label="Birth"
            defaultValue={props.birth}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="E-mail"
            defaultValue={props.email}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            defaultValue={props.address}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={() => handleDeletePatient()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditPatient()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
