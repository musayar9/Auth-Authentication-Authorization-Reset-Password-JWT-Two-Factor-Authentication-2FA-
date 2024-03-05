import notFound from "../assets/notFound.svg"
import PropTypes from 'prop-types'; 
const Error = ({errorMessage}) => {
  return (
    <div className="mx-auto max-w-lg flex items-center flex-col justify-center my-10">
      <img className="h-72" src={notFound} alt="error" />

      <div className="flex items-center flex-col my-8">
        <h2 className="text-slate-700 text-4xl font-bold ">{errorMessage.response.status} - Unauthorized</h2>
        <p className="text-red-500 text-2xl lg:text-4xl  font-semibold ">{errorMessage.response.data.message}</p>
      </div>
    </div>
  );
}


Error.propTypes={
errorMessage:PropTypes.object
}


export default Error
