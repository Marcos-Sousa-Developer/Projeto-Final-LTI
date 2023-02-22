import UseFetch from '../../hooks/UseFetch';
import { Link  } from "react-router-dom";
import { SignUp } from '../../components/';
import { Footer } from '../../components/';


function SignUp() {

  const {state} = UseFetch('/api')

  return (
    <>
      <SignUp></SignUp>
      <Footer></Footer>
    </>
  );

}

export default SignUp;