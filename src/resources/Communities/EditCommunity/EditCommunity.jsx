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
  Labeled,
} from 'react-admin';
import { STATIC_URL } from '../../../constants';

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
        <ImageInput
          source="imagePath"
          accept="image/png, image/jpeg"
          maxSize="10000000"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <FormDataConsumer>
          {({ formData }) => {
            if (formData.imagePath.src) {
              return null;
            }
            return (
              <div>
                <Labeled label="Community image">
                  <img
                    src={`${STATIC_URL}${formData.imagePath}`}
                    alt="community"
                  />
                </Labeled>
              </div>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
}
