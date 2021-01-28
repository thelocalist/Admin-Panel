import React from 'react';
import { Edit, SimpleForm, TextInput, Toolbar, SaveButton } from 'react-admin';

const EditCommunityToolbar = (props) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};

export default function EditStory(props) {
  return (
    <Edit title="Edit community" {...props}>
      <SimpleForm toolbar={<EditCommunityToolbar />}>
        <TextInput source="title" />
      </SimpleForm>
    </Edit>
  );
}
