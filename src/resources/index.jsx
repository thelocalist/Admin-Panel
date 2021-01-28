import React from 'react';
import { Admin, Resource } from 'react-admin';
import { dataProvider, authProvider } from '../apiProviders';

import StoriesList from './Stories/StoriesList/StoriesList';
import CreateStory from './Stories/CreateStory/CreateStory';
import EditStories from './Stories/EditStories/EditStories';

import CommunitiesList from './Communities/CommunitiesList/CommunitiesList';
import CreateCommunity from './Communities/CreateCommunity/CreateCommunity';
import EditCommunity from './Communities/EditCommunity/EditCommunity';

export default function index() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        name="stories"
        list={StoriesList}
        create={CreateStory}
        edit={EditStories}
      />
      <Resource
        name="communities"
        list={CommunitiesList}
        create={CreateCommunity}
        edit={EditCommunity}
      />
    </Admin>
  );
}
