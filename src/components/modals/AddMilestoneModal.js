import {Button, Input, InputLabel, Modal} from "@material-ui/core";
import React from "react";

export default function AddMilestoneModal({open, handleClose, values, handleChange, submitAnswer}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal_wrapper">
        <h1>Add new milestone</h1>
        <InputLabel htmlFor="standard-adornment-email" className='label'>Enter text</InputLabel>
        <Input
          id="standard-adornment-email"
          type='text'
          value={values.email}
          onChange={handleChange('text')}
          className='input'
        />
        <div className="flex btn_modal_wrapper">
          <Button variant="contained" color="primary" onClick={submitAnswer}>Add milestone</Button>
          <div className="break" />
          <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}
