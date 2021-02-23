import React, { useState, useRef } from 'react';

import { TextInput, required, maxLength } from 'react-admin';

const StoryTitleInput = () => {
  const [titleValue, setTitleValue] = useState('');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef();

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextInput
        inputRef={inputRef}
        style={{ minWidth: 256 }}
        source="title"
        label="Title"
        value={titleValue}
        validate={[required(), maxLength(100)]}
        onChange={(event) => {
          if (!touched) {
            inputRef.current.blur();
            inputRef.current.focus();
            setTouched(true);
          }
          setTitleValue(event.target.value);
        }}
      />
      {100 - titleValue.length <= 50 && (
        <span
          style={{
            marginLeft: 20,
            position: 'relative',
            top: -10,
            color: titleValue.length > 100 ? 'red' : 'inherit',
          }}
        >
          Characters left:{' '}
          {100 - titleValue.length <= 50 && 100 - titleValue.length >= 0
            ? 100 - titleValue.length
            : 0}
        </span>
      )}
    </div>
  );
};
export default StoryTitleInput;
