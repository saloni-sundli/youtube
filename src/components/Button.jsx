import PropTypes from "prop-types";

const Button = ({ name }) => {
  console.log(name.replace(/&/g, "and"))
  return (
    <p className="rounded-full text-md px-3 py-2 cursor-pointer"><span>{name}</span></p>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Button;
