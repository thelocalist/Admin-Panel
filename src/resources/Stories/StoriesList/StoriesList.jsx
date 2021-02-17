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

import { NEIGHBORHOODS } from '../../../constants';

const neighborhoodChoises = NEIGHBORHOODS.map((neighborhood) => {
  return {
    id: neighborhood.toLowerCase(),
    name: neighborhood,
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
