
import { MdError } from "react-icons/md";
import PropTypes from "prop-types"
const ErrorMessage = ({message}) => {
  return (
    <div className="bg-red-600 text-gray-50 flex items-center gap-2 rounded-md p-2 mt-2">
      <MdError />
      <p className="text-sm">{message}</p>
    </div>
  );
}


ErrorMessage.propTypes = {
message:PropTypes.string
}
export default ErrorMessage
