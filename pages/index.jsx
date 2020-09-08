import React from 'react';
import Landing from '../src/views/Landing';

export default function Index(props) {

  return (
    <>
      <Landing />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { isConnected } = await connect()

//   return {
//     props: { isConnected },
//   };
// }
