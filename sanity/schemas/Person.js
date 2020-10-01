import { MdPerson as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'person',
  // visible title
  title: 'Slice Masters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 180,
      },
    },
    {
      name: 'description',
      title: 'Description',
      description: 'Tell us a bit about them',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
