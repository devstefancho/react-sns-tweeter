import styled from "styled-components";

const Message = styled.p`
  display: flex;
  font-size: 2em;
  background-color: white;
  color: blue;
  height: 80vh;
`;

function Error({ statusCode }) {
  return (
    <Message>
      {statusCode
        ? `An Error ${statusCode} occurred on server`
        : `An Error occurred on client`}
    </Message>
  );
}

Error.getInitialProps = async (ctx) => {
  const statusCode = ctx.res
    ? ctx.res.statusCode
    : ctx.err
    ? ctx.err.statusCode
    : null;
  return { statusCode };
};

export default Error;
