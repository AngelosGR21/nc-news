import colors from "./colors";

const dropdownTopicsStyles = {
  menu: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
    position: "absolute",
    zIndex: -1,
    clipPath: "circle(5% at 5% 0%)",
    transition: "clip-path 1s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  expandDropdown: {
    clipPath: "circle(200% at 5% 0%)",
  },
  dropdownHomeLink: {
    marginTop: "8rem",
    color: colors.red,
    textDecorationColor: colors.red,
  },
  topicsDropdownContainer: {
    display: "flex",
  },
  topicsContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "space-evenly",
    height: "20%",
  },
  arrowDown: {
    color: colors.white,
    transition: "all 1s",
  },
  arrowReversed: {
    transform: "rotate(-180deg)",
  },
  topicLinks: {
    color: colors.red,
    textDecorationColor: colors.red,
    fontSize: "20px",
    letterSpacing: "3px",
  },
};

export default dropdownTopicsStyles;
