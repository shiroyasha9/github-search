import Head from 'next/head';
import React from 'react';

import { Info, Repos, Search, User } from '../components';
import { GithubContext } from '../context';

const Home = () => {
  const { isLoading } = React.useContext(GithubContext);

  return (
    <main>
      <Head>
        <title>GitHub Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Search />
      {isLoading ? (
        <img src={'/preloader.gif'} className='loading-img' alt='loading' />
      ) : (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
    </main>
  );
};

export default Home;
