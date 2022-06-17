import colors from "./colors";

const loginStyles = {
  pageStyles: {
    marginTop: "7rem",
    display: "flex",
    flexDirection: "column",
  },
  userContainer: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  avatar: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "top",
  },
  button: {
    border: `2px solid ${colors.red}`,
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default loginStyles;
