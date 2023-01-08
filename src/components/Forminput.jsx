import {forwardRef} from "react";
import { Form } from 'react-bootstrap';
import axios from 'axios';

const Forminput = forwardRef((props, ref) => {
  return (
    <Form className="mb-2">
      <Form.Label htmlFor={props.id} className="d-block mb-1">
        {props.label}
      </Form.Label>

      <Form.Control
        id={props.id}
        type={props.type}
        ref={ref}
        className="shadow-sm p-3 w-full border"
        onBlur={() => {
          const check = ref?.current?.value;
          axios
            .post(`http://localhost:4000/user/register/${props.name}`, { check })
            .then((result) => {
              console.log(result);
            })
            .catch(() => {
              console.log('실패');
            });
        }}
      />

      <Form.Text className="text-danger m-1">{props.validText}</Form.Text>
    </Form>
  );
});

export default Forminput;