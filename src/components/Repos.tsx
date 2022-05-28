import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar2D, Doughnut2D } from './Charts';

interface ILanguage {
  label: string;
  value: number;
  stars: number;
}

const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  // creating objects of total languages in all repos
  const languages: { [language: string]: ILanguage } = repos.reduce(
    (total, item) => {
      const { language, stargazers_count } = item;
      if (!language) return total;
      if (!total[language]) {
        total[language] = {
          label: language,
          value: 1,
          stars: stargazers_count
        };
      } else {
        total[language] = {
          ...total[language],
          value: total[language].value + 1,
          stars: total[language].stars + stargazers_count
        };
      }
      return total;
    },
    {} as { [language: string]: ILanguage }
  );

  // Converting the object into an array and sorting based on Values
  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  // Most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => b.stars - a.stars)
    .map(item => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // stars, forks
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {} as { [index: number]: { label: string; value: number } },
      forks: {} as { [index: number]: { label: string; value: number } }
    }
  );

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar2D data={forks} />
      </Wrapper>
    </section>
  );
};

// Styled Component
const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
