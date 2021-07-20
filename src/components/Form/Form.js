import React, { useState, useEffect, useRef } from "react";
import Dragula from "react-dragula";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";

import styles from "./Form.module.css";

const Form = () => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: false,
  });

  const [containers, setContainers] = useState([]);
  const onhandleContainer = (ref) => {
    let aux = containers;
    aux.push(ref);
    setContainers(aux);
  };

  const dragulaDecorator = useRef(null);

  useEffect(() => {
    if (dragulaDecorator.current) {
      onhandleContainer(dragulaDecorator.current);
    }
  }, [onhandleContainer]);


  useEffect(() => {
    let options = {};
    Dragula(containers, options);
  }, [containers]);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  return (
    <div className={styles.form}>
      <FormGroup column>
        <FormControlLabel
          control={<Checkbox checked={state.checkedA} name="checkedA" />}
          label="Email"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange}
              name="checkedB"
            />
          }
          label="Phone Number"
        />
      </FormGroup>

      <br />

      <div className={styles.login}>
        <div  ref={dragulaDecorator}>
        {state.checkedA ? (
          <div >
            <form style={{cursor: 'grabbing'}}>
              <TextField id="email" label="Email Id" disabled />
              <br />
              <TextField id="password" label="Password" disabled />
            </form>
          </div>
        ) : null}

        {state.checkedB ? (
          <>
            <div>
              <form style={{ marginTop: "20px", marginBottom: "20px", cursor: 'grabbing' }}>
                <TextField id="phone" label="Phone Number" disabled />
              </form>
            </div>
          </>
        ) : null}

</div>

        <br />
        <Button variant="contained" fullWidth={true}>
          Log In
        </Button>
        <br />
        <br />
        <Typography>
          New user? <Link href="#">Sign Up</Link>
        </Typography>
      </div>
    </div>
  );
};

export default Form;
