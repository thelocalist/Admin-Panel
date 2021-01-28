import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export default function CreateCommunity(props) {
  return (
    <Create title="Create a community" {...props}>
      <SimpleForm>
        <TextInput source="title" />
      </SimpleForm>
    </Create>
  );
}
