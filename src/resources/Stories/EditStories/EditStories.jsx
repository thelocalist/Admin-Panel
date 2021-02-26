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
  FormDataConsumer,
  ImageField,
  ImageInput,
  required,
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import {
  IMAGE_MAX_SIZE,
  IMAGE_MIME_TYPES,
  STATIC_URL,
  NEIGHBORHOODS,
} from '../../../constants';

import StoryTitleInput from '../../../components/StoryTitleInput';

const neighborhoodChoises = NEIGHBORHOODS.map((neighborhood) => {
  return {
    id: neighborhood.toLowerCase(),
    name: neighborhood,
  };
});

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
        <StoryTitleInput />
        {/* <TextInput source="title" validate={[required()]} /> */}
        <TextInput source="authorName" validate={[required()]} />
        <BooleanInput label="Featured" source="isFeatured" />
        <BooleanInput label="Make the main story" source="isMainStory" />
        <ReferenceInput
          label="Community"
          source="communityId"
          reference="communities"
          validate={[required()]}
        >
          <SelectInput optionText="title" defaultValue="" />
        </ReferenceInput>
        <SelectInput
          source="neighborhood"
          choices={neighborhoodChoises}
          validate={[required()]}
        />
        <ImageInput
          source="headerImage"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Header image"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <FormDataConsumer>
          {({ formData }) =>
            formData.headerImagePath && (
              <img
                src={`${STATIC_URL}${formData.headerImagePath}`}
                alt="Header"
              />
            )
          }
        </FormDataConsumer>
        <ImageInput
          source="authorImage"
          accept={IMAGE_MIME_TYPES}
          maxSize={IMAGE_MAX_SIZE}
          label="Author image"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <FormDataConsumer>
          {({ formData }) =>
            formData.authorImagePath && (
              <img
                src={`${STATIC_URL}${formData.authorImagePath}`}
                alt="Author"
              />
            )
          }
        </FormDataConsumer>
        <RichTextInput source="content" validate={[required()]} />
      </SimpleForm>
    </Edit>
  );
}
