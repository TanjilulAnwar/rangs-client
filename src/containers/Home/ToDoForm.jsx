import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import axios from "../../api";
import cogoToast from "cogo-toast";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
    background: "#fff",
    padding: 10,
    borderRadius: 5,
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function AddForm({ handleTodoList, update_date }) {
  const classes = useStyles();
  const [ass_list, setAsslist] = React.useState([]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    axios.get("/Prop/User").then((resp) => setAsslist(resp.data.message));
  }, []);

  React.useEffect(() => {
    const s_date = new Date(update_date.start_date);
    const e_date = new Date(update_date.end_date);
    const s_d = `${s_date.getFullYear()}-${(
      "0" +
      (s_date.getMonth() + 1)
    ).slice(-2)}-${("0" + s_date.getDate()).slice(-2)}`;
    const e_d = `${e_date.getFullYear()}-${(
      "0" +
      (e_date.getMonth() + 1)
    ).slice(-2)}-${("0" + e_date.getDate()).slice(-2)}`;
    update_date["start_date"] = s_d;
    update_date["end_date"] = e_d;
    reset({ ...update_date });
  }, [update_date]);

  const onSubmit = (data) => {
    axios.post("/Duty/Add", data).then((resp) => {
      if (resp.data.success) {
        reset({});
        handleTodoList(resp.data.message);
      } else cogoToast.error(resp.data.message);
    });
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Start Date"
              required
              type="date"
              size="small"
              variant="outlined"
              error={!!errors["start_date"]}
              inputProps={{
                ...register("start_date", { required: true }),
                required: "",
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="End Date"
              required
              type="date"
              size="small"
              variant="outlined"
              error={!!errors["end_date"]}
              inputProps={{
                ...register("end_date", { required: true }),
                required: "",
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Task Name"
              required
              size="small"
              variant="outlined"
              error={!!errors["task_name"]}
              inputProps={{
                ...register("task_name", { required: true }),
                required: "",
              }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              control={control}
              name="assign_to"
              render={({ field: { onChange, value } }) => (
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="assign-to">Assign To</InputLabel>
                  <Select
                    labelId="assign-to"
                    label="Assign To"
                    value={value || ""}
                    onChange={onChange}
                  >
                    {ass_list.map((val, i) => (
                      <MenuItem
                        key={i}
                        value={`${val.first_name} ${val.last_name} (${val.user_id})`}
                      >
                        {val.first_name} {val.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {/* <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="assign-to">Assign To</InputLabel>
              <Select
                labelId="assign-to"
                label="Assign To"
                error={!!errors['assign_to']}
                inputProps={{...register('assign_to', {required: true}), required: ''}}
              >
                {ass_list.map((val,i) => (
                  <MenuItem key={i} value={`${val.first_name} ${val.last_name} (${val.user_id})`}>{val.first_name} {val.last_name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Description"
              size="small"
              variant="outlined"
              error={!!errors["description"]}
              inputProps={{ ...register("description") }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              type="submit"
              size="small"
              variant="contained"
              color="secondary"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
