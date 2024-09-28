import PropagateLoader from 'react-spinners/PropagateLoader'

const Loader = () => {

  const override = {
    display: 'flex',
    alignItems: 'center',  // Changed to camelCase
    justifyContent: 'center',  // Changed to camelCase
    margin: '12rem auto',
};

    return (
        <div>
            <PropagateLoader 
            cssOverride={override} 
            color="#3b82f6"
            size={30}
            aria-label = 'Loading Spinner'
            />
        </div>
    );
}

export default Loader;
