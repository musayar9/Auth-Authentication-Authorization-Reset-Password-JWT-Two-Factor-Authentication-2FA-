import {ColorRing} from "react-loader-spinner"

const Loading = () => {
  return (
    <div className="flex items-center justify-center mx-auto my-24">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#6ee7b7", "#34d399", "##10b981", "#059669", "#047857"]}
      />
    </div>
  );
}

export default Loading
