import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  ImageField,
  ImageInput,
  FormDataConsumer,
  required,
} from 'react-admin';
import {
  IMAGE_MAX_SIZE,
  IMAGE_MIME_TYPES,
  STATIC_URL,
} from '../../../constants';

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
        <TextInput source="title" validate={[required()]} />
        <ImageInput
          source="image"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <FormDataConsumer>
          {({ formData }) =>
            formData.imagePath && (
              <img src={`${STATIC_URL}${formData.imagePath}`} alt="community" />
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
}
