import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  DeleteButton,
} from 'react-admin';

export default function UsersList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="email" />
        <TextField source="role" />
        <DateField source="createdAt" />
        <EditButton basePath="/users" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
