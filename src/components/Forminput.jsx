import { Form } from 'react-bootstrap';
import { useEffect, useRef } from 'react';

export default function Forminput({
  id,
  label,
  value,
  validText,
  onChange,
  inputProps,
  errMessage,
}) {

  const inputRef = useRef(null);

  // 최초 1회 로드 시 ID input에 포커스

  useEffect(() => {
    if (id === 'nickname') {
      inputRef.current.focus();
    }
  }, [id]);

  return (
    <Form className="mb-2">
      <Form.Label htmlFor={id} className="d-block mb-1">
        {label}
      </Form.Label>

      <Form.Control
        id={id}
        {...inputProps}
        ref={inputRef}
        value={value}
        onChange={onChange}
        className="shadow-sm p-3 w-full border"
      />

      <Form.Text className="text-danger m-1">{validText}</Form.Text>
    </Form>
  );
}
