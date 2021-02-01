import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  ImageField,
  ImageInput,
} from 'react-admin';

const EditCommunityToolbar = (props) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};

export default function EditStory(props) {
  console.log(props);
  return (
    <Edit title="Edit community" {...props}>
      <SimpleForm toolbar={<EditCommunityToolbar />}>
        <TextInput source="title" />
        <ImageInput
          source="imagePath"
          accept="image/png, image/jpeg"
          maxSize="10000000"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
}
