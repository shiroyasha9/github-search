import React, { useState, useEffect } from 'react';
import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { mockUser, mockRepos, mockFollowers } from './mockData';
import { IFollower, IRepo, IUser } from '../types';

const ROOT_URL = 'https://api.github.com';

interface IProps {
  children: React.ReactNode;
}

export const GithubContext = React.createContext({
  githubUser: mockUser,
  repos: mockRepos,
  followers: mockFollowers,
  requests: 0,
  error: { show: false, msg: '' },
  searchGithubUser: async (user: string) => {},
  isLoading: false
});

export const GithubProvider = ({ children }: IProps) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user: string) => {
    toggleError();
    setIsLoading(true);
    const response: AxiosResponse<IUser> | void = await axios(
      `${ROOT_URL}/users/${user}`
    ).catch(err => console.log(err));
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled<
        [AxiosPromise<IRepo[]>, AxiosPromise<IFollower[]>]
      >([
        axios(`${ROOT_URL}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`)
      ])
        .then(results => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch(err => console.log(err));
    } else {
      toggleError(true, 'there is no user with that username!');
    }
    checkRequests();
    setIsLoading(false);
  };

  //check rate
  const checkRequests = () => {
    axios(`${ROOT_URL}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining }
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit!');
        }
      })
      .catch(err => console.log(err));
  };

  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
