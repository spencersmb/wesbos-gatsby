import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

// Count how many pizzas are in each topping
function countPizzas(toppings, pizzas) {
  return toppings.map(topping => ({
    [topping.name]: pizzas.filter(pizza =>
      pizza.toppings.find(pizzaTopping => pizzaTopping.id === topping.id)
    ).length,
  }));
}

// Count number of toppings per pizza
function countPizzaToppings(pizzas) {
  return pizzas
    .map(pizza => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      const existingTopping = acc[topping.name];
      if (existingTopping) {
        // eslint-disable-next-line no-return-assign
        return {
          ...acc,
          // eslint-disable-next-line no-multi-assign,no-plusplus
          ...([topping.name].count = acc[topping.name].count++),
        };
      }

      return {
        ...acc,
        [topping.name]: {
          count: 1,
          name: topping.name,
          id: topping.id,
        },
      };
    }, {});
}
// loop over list of toppings and display the topping and the count of pizzas in that topping
// Link up the the main list of pizzas
export default function ToppingsFilter({ activeTopping }) {
  // Get list of all toppings
  // Get list of all pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          name
          id
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  console.clear();

  console.log('countPizzas', countPizzas(toppings.nodes, pizzas.nodes));
  console.log('countPizzaToppings', countPizzaToppings(pizzas.nodes));
  const topppingsCount = Object.values(countPizzaToppings(pizzas.nodes)).sort(
    (a, b) => b.count - a.count
  );
  console.log('topppingsCount', topppingsCount);

  return (
    <ToppingsStyles>
      <Link to='/pizzas'>
        <span className='name'>All</span>
        <span className='count'>{pizzas.nodes.length}</span>
      </Link>
      <p>Toppings</p>
      {topppingsCount.map(topping => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className='name'>{topping.name}</span>
          <span className='count'>{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;
