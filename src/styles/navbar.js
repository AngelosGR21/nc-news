import colors from "./colors";

const navbarStyles = {
  appbar: {
    backgroundColor: "black",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    fontSize: "20px",
    textDecoration: "underline",
    color: colors.white,
    marginRight: "10px",
  },

  homeContainer: {
    display: "flex",
    alignItems: "center",
    textDecorationColor: colors.white,
  },
  homeLink: {
    color: colors.white,
  },
};

export default navbarStyles;
