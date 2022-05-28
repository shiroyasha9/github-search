import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Error = () => {
  return (
    <Wrapper>
      <Head>
        <title>Page Not Found!</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <h1>404</h1>
        <h3>sorry, the page you tried cannot be found!</h3>
        <Link href='/'>
          <p className='btn'>Back Home</p>
        </Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: var(--clr-primary-10);
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: var(--clr-grey-3);
    margin-bottom: 1.5rem;
  }
`;
export default Error;
