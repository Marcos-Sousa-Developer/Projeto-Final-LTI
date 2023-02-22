import UseFetch from '../../hooks/UseFetch';
import { Link  } from "react-router-dom";
import { SignIn } from '../../components/';
import { Footer } from '../../components/';

function SignIn() {

  const {state} = UseFetch('/api')

  return (
    <>
      <SignIn></SignIn>
      <Footer></Footer>
    </>
  );

}

export default SignIn;