import React from 'react';
import { Admin, Resource } from 'react-admin';
import { myDataProvider, authProvider } from '../apiProviders';

import StoriesList from './Stories/StoriesList/StoriesList';
import CreateStory from './Stories/CreateStory/CreateStory';
import EditStories from './Stories/EditStories/EditStories';

import CommunitiesList from './Communities/CommunitiesList/CommunitiesList';
import CreateCommunity from './Communities/CreateCommunity/CreateCommunity';
import EditCommunity from './Communities/EditCommunity/EditCommunity';

import SubscribersList from './Subscribers/SubscribersList/Subscriberslist';

export default function index() {
  return (
    <Admin dataProvider={myDataProvider} authProvider={authProvider}>
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
      <Resource name="contacts" list={SubscribersList} />
    </Admin>
  );
}
