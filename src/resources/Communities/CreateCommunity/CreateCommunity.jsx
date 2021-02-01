import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ImageField,
  ImageInput,
  useRedirect,
} from 'react-admin';

export default function CreateCommunity(props) {
  const redirect = useRedirect();
  return (
    <Create
      title="Create a community"
      {...props}
      onSuccess={() => redirect('/communities')}
    >
      <SimpleForm>
        <TextInput source="title" />
        <ImageInput source="imagePath">
          <ImageField
            accept="image/png, image/jpeg"
            maxSize="10000000"
            source="src"
            title="title"
          />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
}
