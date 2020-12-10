import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  navBar: {
    backgroundColor: "#fff",
    boxShadow: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    color: "#000",
  },
  logo: {
    height: "25px",
    width: "auto",
  },
}));
