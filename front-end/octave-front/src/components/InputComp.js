import React from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

const InputComp = (props) => {
  return (
    <div>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input placeholder="Input value" type="number" step="1" />
        <InputGroupAddon addonType="append">.00</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
        <Input placeholder="Input value" type="number" step="1" />
        <InputGroupAddon addonType="append">.00</InputGroupAddon>
      </InputGroup>
      <Button color="primary" size="lg" block>Send button</Button>
    </div>
  );
};

export default InputComp;
