import { Box } from "@mui/material";
import { ReactNode } from "react";

interface TableWrapperProps {
  children: ReactNode;
}

const TableWrapper = ({ children }: TableWrapperProps) => {
  return (
    <Box 
      sx={{ 
        bgcolor: "rgb(23, 22, 36)",
        borderRadius: 2, 
        p: 3, 
        mb: 4 
      }}
    >
      {children}
    </Box>
  );
};

export default TableWrapper;