import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  Filter,
  ReferenceField,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

const StoriesFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput
      label="Community"
      source="communityId"
      reference="communities"
    >
      <SelectInput optionText="title" />
    </ReferenceInput>
  </Filter>
);

export default function UsersList(props) {
  return (
    <List {...props} filters={<StoriesFilter />}>
      <Datagrid>
        <TextField source="title" />
        <ReferenceField
          label="Community"
          source="communityId"
          reference="communities"
        >
          <TextField source="title" />
        </ReferenceField>
        <TextField source="authorName" />
        <DateField source="createdAt" />
        <EditButton basePath="/stories" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
