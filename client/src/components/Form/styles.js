import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    backgroundColor: "#f4f4f4",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "100%",
    margin: "12px 0",
  },
  buttonSubmit: {
    marginTop: 15,
    marginBottom: 10,
  },
  addImage: {
    height: "200px",
  },
}));
