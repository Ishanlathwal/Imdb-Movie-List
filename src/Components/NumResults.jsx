/* eslint-disable react/prop-types */
export const NumResults = ({ movies }) => {
  return (
    <p className='num-results'>
      Found <strong>{movies?.length}</strong> results
    </p>
  );
};
