import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

const CreateText = (props) => {
  const { valuesfield, setValuesfield } = props;
  const { refs } = props;
  const [linestext, setLinestext] = React.useState(6);

  const handleChangefield = (e, index) => {
    valuesfield[index] = e.target.value;
    setValuesfield([...valuesfield]);
  };

  useEffect(() => {
    if (props.lines !== null && props.lines !== undefined) {
      setLinestext(props.lines);
    }
  }, []);

  return (
    <React.Fragment>
      <div style={{ width: '100%', padding: '5px 5px 5px 5px' }}>
        <Row>
          <p className="mb-1 text-muted" style={{ textAlign: 'left' }}>
            {props.title} :
          </p>
          <Col sm={12} lg={12}>
            <textarea
              id={props.name}
              name={props.name}
              className="form-control"
              value={valuesfield[props.index]}
              onChange={(e) => handleChangefield(e, props.index)}
              onBlur={props.methodBlur}
              placeholder={props.placeholder}
              rows={linestext}
              disabled={props.disabled}
              readOnly={props.readonly}
              style={!props.required ? { backgroundColor: '#f4f7fa' } : { backgroundColor: '#e2ecfa' }}
              autoComplete="off"
              ref={(el) => {
                refs.current[props.index] = el; // Preenche as refs com os elementos
              }}
            ></textarea>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default CreateText;
