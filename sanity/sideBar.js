import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdStore as icon } from 'react-icons/md';

// build a custom sidebar

export default function Sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create new subitem
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>{icon}</strong>)
        .child(
          S.editor()
            .schemaType('storeSettings')
            // make a new doc to avoid random string numbers
            .documentId('downtown')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
