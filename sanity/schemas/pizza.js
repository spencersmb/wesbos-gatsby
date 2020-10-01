import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

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
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array', // one to many relation -> https://www.sanity.io/docs/array-type
      // type == reference
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      // Select first 3 toppings
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
    },
    prepare: ({ title, media, ...toppings }) => {
      // get the values from the key/value pariing in an object, convert it to an array
      // Then filter through it to exclude undefined values
      const pizzaToppings = Object.values(toppings).filter(Boolean);
      return {
        title,
        media, // media is the image src
        subtitle: `${pizzaToppings.join(', ')}`,
      };
    },
  },
};
