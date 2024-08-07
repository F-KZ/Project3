import wait from '../images/wait.svg'
import {
  Image
} from '@chakra-ui/react';

 const Loader = () => {
  return (
    <div className="flex justify-center items-center">
        <Image src={wait} alt='Loading...' />
        </div>
  );
};
 export default Loader