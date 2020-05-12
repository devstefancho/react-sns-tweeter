import React from "react";
import PropTypes from "prop-types";

const User = ({ id }) => {
  return <div>User Id : {id}</div>;
};

User.propType = {
  id: PropTypes.number.isRequired,
};

User.getInitialProps = (context) => {
  console.log(context.query.id);
  return { id: context.query.id };
};

export default User;
