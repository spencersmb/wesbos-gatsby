import React from 'react';
// eslint-disable-next-line import/no-unresolved
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formateMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

// Refer to Video 15 for this component
export default function PriceInput({ inputComponent, type, value, onChange }) {
  return (
    <div>
      <h2>
        {type.title} {value ? `- ${formateMoney(value)}` : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        name={type.title}
        value={value}
        defaultValue={1000}
        min={1000}
        onChange={event => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
