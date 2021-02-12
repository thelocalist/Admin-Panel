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
import { IMAGE_MAX_SIZE, IMAGE_MIME_TYPES, AREAS } from '../../../constants';

const neighborhoodChoises = AREAS.map((area) => {
  return {
    id: area.toLowerCase(),
    name: area,
  };
});

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
        <SelectInput
          source="neighborhood"
          choices={neighborhoodChoises}
          validate={[required()]}
          autoComplete
        />
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
