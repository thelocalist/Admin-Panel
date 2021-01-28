import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
  // SimpleList,
} from 'react-admin';

export default function UsersList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="title" />
        <TextField source="authorName" />
        <DateField source="createdAt" />
        <EditButton basePath="/stories" />
        <DeleteButton />
      </Datagrid>
      {/*   <SimpleList
        primaryText={(story) => story.title}
        secondaryText={(story) => story.createdAt}
      /> */}
    </List>
  );
}
