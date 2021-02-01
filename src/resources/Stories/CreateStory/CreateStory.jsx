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
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { IMAGE_MAX_SIZE, IMAGE_MIME_TYPES } from '../../../constants';

export default function CreateStory(props) {
  return (
    <Create title="Create a story" {...props}>
      <SimpleForm>
        <TextInput source="title" />
        <TextInput source="authorName" />
        <BooleanInput label="Featured" source="isFeatured" />
        <ReferenceInput
          label="Community"
          reference="communities"
          source="communityId"
        >
          <SelectInput optionText="title" defaultValue="" />
        </ReferenceInput>
        <ImageInput
          source="headerImagePath"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Header image"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <ImageInput
          source="authorImagePath"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Author image"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <RichTextInput source="content" />
      </SimpleForm>
    </Create>
  );
}
