import { MdLocalPizza as icon } from 'react-icons/md';

export default {
  // Computer Name
  name: 'pizza',
  // visible title
  title: 'pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the Pizza',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      // 1000 = $10, 50000 => $50
      // .max(50000)
      validation: Rule => Rule.min(1000),
    },
  ],
};
