import colors from "./colors";

const allTopicsStyles = {
  allTopicsContainer: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "5rem",
  },
  link: {
    color: colors.red,
    textDecorationColor: colors.red,
    marginTop: "3rem",
    fontSize: "1.5rem",
    textTransform: "capitalize",
  },
  currentTopic: {
    marginTop: "3rem",
    fontSize: "1.5rem",
    textTransform: "capitalize",
  },
};

export default allTopicsStyles;
