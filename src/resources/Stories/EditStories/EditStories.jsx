import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  SelectInput,
  ReferenceInput,
  BooleanInput,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

const EditStoryToolbar = (props) => {
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};

export default function EditStory(props) {
  return (
    <Edit title="Edit story" {...props}>
      <SimpleForm toolbar={<EditStoryToolbar />}>
        <TextInput source="title" />
        <TextInput source="authorName" />
        <BooleanInput label="Featured" source="isFeatured" />
        <ReferenceInput
          label="Community"
          source="communityId"
          reference="communities"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
        <RichTextInput source="content" />
      </SimpleForm>
    </Edit>
  );
}
