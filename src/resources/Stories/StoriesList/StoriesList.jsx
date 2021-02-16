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

import { AREAS } from '../../../constants';

const neighborhoodChoises = AREAS.map((area) => {
  return {
    id: area.toLowerCase(),
    name: area,
  };
});

const StoriesFilter = (props) => (
  <Filter {...props}>
    <ReferenceInput
      label="Community"
      source="communityId"
      reference="communities"
    >
      <SelectInput optionText="title" />
    </ReferenceInput>
    <SelectInput source="neighborhood" choices={neighborhoodChoises} />
  </Filter>
);

export default function UsersList(props) {
  return (
    <List
      {...props}
      filters={<StoriesFilter />}
      sort={{ field: 'createdAt', order: 'DESC' }}
    >
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
