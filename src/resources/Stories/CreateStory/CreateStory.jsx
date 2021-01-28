import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

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
          <SelectInput optionText="title" />
        </ReferenceInput>
        <RichTextInput source="content" />
      </SimpleForm>
    </Create>
  );
}
