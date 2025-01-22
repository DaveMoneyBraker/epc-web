import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const EnhancedLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "underline",
  textUnderlineOffset: "0.2em",
  textDecorationThickness: "0.05em", // Theme-consistent thickness
  textDecorationColor: "rgba(25, 118, 210, 0.4)", // semi-transparent primary color
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  transition: theme.transitions.create(
    ["text-decoration-color", "text-decoration-thickness", "color"],
    {
      duration: theme.transitions.duration.shorter,
    }
  ),

  "&:hover": {
    color: theme.palette.primary.dark,
    textDecorationColor: "inherit", // Full color on hover
    textDecorationThickness: "0.1em", // Slightly thicker on hover
  },

  "&:visited": {
    color: theme.palette.primary.main,
  },

  "&:active": {
    color: theme.palette.primary.main,
  },
}));
