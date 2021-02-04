import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ImageField,
  ImageInput,
  useRedirect,
  required,
} from 'react-admin';
import { IMAGE_MAX_SIZE, IMAGE_MIME_TYPES } from '../../../constants';

export default function CreateCommunity(props) {
  const redirect = useRedirect();
  return (
    <Create
      title="Create a community"
      {...props}
      onSuccess={() => redirect('/communities')}
    >
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <ImageInput source="image" validate={[required()]}>
          <ImageField
            source="src"
            title="title"
            accept={IMAGE_MIME_TYPES}
            maxSize={IMAGE_MAX_SIZE}
          />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
}
