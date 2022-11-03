/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    ...(theme.palette.mode === "light"
        ? {
              "& label": {
                  color: theme.palette.primary.main,
              },
              "& label.Mui-focused": {
                  color: theme.palette.primary.main,
              },
              "& .MuiOutlinedInput-root": {
                  backgroundColor: "#f5f5f5",
                  "&:hover fieldset": {
                      borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                  },
              },
          }
        : {
              "& label": {
                  color: theme.palette.secondary.main,
              },
              "& label.Mui-focused": {
                  color: theme.palette.secondary.main,
              },
              "& .MuiOutlinedInput-root": {
                  backgroundColor: "#616161",
                  "&:hover fieldset": {
                      borderColor: theme.palette.secondary.main,
                  },
                  "&.Mui-focused fieldset": {
                      borderColor: theme.palette.secondary.main,
                  },
              },
          }),
}));

type MyTextFieldType = {
    type?: string;
    name: string;
    placeholder?: string;
    label: string;
    autoComplete?: string;
    formik: any;
};

const MyTextField = ({ type, name, label, placeholder, autoComplete, formik }: MyTextFieldType) => (
    <StyledTextField
        type={type !== undefined ? type : "text"}
        name={name}
        label={label}
        placeholder={placeholder !== undefined ? placeholder : undefined}
        autoComplete={autoComplete !== undefined ? autoComplete : name}
        fullWidth
        margin='normal'
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
    />
);

export default MyTextField;
