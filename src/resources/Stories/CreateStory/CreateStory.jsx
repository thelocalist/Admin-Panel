import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  ImageInput,
  ImageField,
  required,
  useRedirect,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { IMAGE_MAX_SIZE, IMAGE_MIME_TYPES } from '../../../constants';

export default function CreateStory(props) {
  const redirect = useRedirect();
  return (
    <Create
      title="Create a story"
      {...props}
      onSuccess={() => redirect('/stories')}
    >
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput source="authorName" validate={[required()]} />
        <BooleanInput label="Featured" source="isFeatured" />
        <ReferenceInput
          label="Community"
          reference="communities"
          source="communityId"
          validate={[required()]}
        >
          <SelectInput optionText="title" defaultValue="" />
        </ReferenceInput>
        <ImageInput
          source="headerImage"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Header image"
          validate={[required()]}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput
          source="authorImage"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Author image"
          validate={[required()]}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <RichTextInput source="content" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
}
