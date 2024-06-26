import {Button, Input, InputLabel, Modal} from "@material-ui/core";
import React from "react";

export default function AddNewChallengeModal({open, handleClose, values, handleChange, submitAnswer, challengeType}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal_wrapper">
        <h1>Add new {challengeType}</h1>
        <InputLabel htmlFor="standard-adornment-email" className='label'>Enter {challengeType} title</InputLabel>
        <Input
          id="standard-adornment-email"
          type='text'
          value={values.email}
          onChange={handleChange('title')}
          className='input'
        />
        <InputLabel htmlFor="standard-adornment-email" className='label'>Enter {challengeType} description</InputLabel>
        <Input
          id="standard-adornment-email"
          type='text'
          value={values.email}
          onChange={handleChange('desc')}
          className='input'
        />
        <div className="flex btn_modal_wrapper">
          <Button variant="contained" color="primary" onClick={submitAnswer}>Add {challengeType}</Button>
          <div className="break" />
          <Button variant="outlined" color="secondary" onClick={handleClose}>Close</Button>
        </div>
      </div>
    </Modal>
  )
}
