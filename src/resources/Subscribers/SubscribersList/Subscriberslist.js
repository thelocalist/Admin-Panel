import React from 'react';
import { List, Datagrid, TextField, DateField } from 'react-admin';

export default function SubscribersList(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="email" />
        <DateField source="createdAt" />
      </Datagrid>
    </List>
  );
}
