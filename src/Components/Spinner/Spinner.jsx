import Spinner from "react-bootstrap/Spinner";
import Loader from "../Assets/Images/Eclipse@1x-0.4s-200px-200px.gif";
const SpinnerLoader = () => {
  return (
    <>
      <div className="LoaderContainer">
        <img src={Loader} height={100} alt="loader" />
        <h5>
          &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          &nbsp;
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </h5>
      </div>
    </>
  );
};

export default SpinnerLoader;
