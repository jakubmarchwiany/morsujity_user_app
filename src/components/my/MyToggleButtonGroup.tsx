import { ToggleButtonGroup, ToggleButtonProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const MyToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonProps>(({ theme }) => ({
    ...(theme.palette.mode === "light"
        ? {
              "& .MuiToggleButton-root.Mui-selected": {
                  color: theme.palette.secondary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 1),
              },
          }
        : {
              "& .MuiToggleButton-root.Mui-selected": {
                  color: theme.palette.secondary.main,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.3),
              },
          }),
}));

export default MyToggleButtonGroup;
