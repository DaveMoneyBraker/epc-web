import { InboxOutlined } from "@mui/icons-material";
import { Box, styled, Typography } from "@mui/material";

// Styled components for the empty state
const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
}));

const EmptyStateIcon = styled(InboxOutlined)(({ theme }) => ({
  fontSize: 64,
  color: theme.palette.grey[400],
  marginBottom: theme.spacing(2),
}));

const EmptyStateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: "center",
  maxWidth: "300px",
}));

export const NoTableDataMessage = ({
  message = "No Data Available",
}: {
  message?: string;
}) => (
  <EmptyStateContainer>
    <EmptyStateIcon />
    <EmptyStateText variant="h6">{message}</EmptyStateText>
    <EmptyStateText variant="body2" sx={{ mt: 1 }}>
      Create new element or try adjusting your search or filters
    </EmptyStateText>
  </EmptyStateContainer>
);
