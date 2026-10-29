import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import { StyledBackgroundSection, StyledSubtitle } from "@components/styled/base";
import { TERMS, Term } from "@utils/default/Supportpage";

export const SupportGlossary = () => {
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  return (
    <StyledBackgroundSection>
      <StyledSubtitle>Словник термінів</StyledSubtitle>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        spacing={2}
        useFlexGap
      >
        {TERMS.map((item) => (
          <Button
            key={item.term}
            onClick={() => setSelectedTerm(item)}
            sx={{
              borderRadius: 50,
              backgroundColor: "#fff",
              color: "#4A3B72",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#D4C8EC",
              },
            }}
          >
            {item.term}
          </Button>
        ))}
      </Stack>

      <Dialog
        open={!!selectedTerm}
        onClose={() => setSelectedTerm(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{selectedTerm?.term}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedTerm?.definition}</DialogContentText>
        </DialogContent>
      </Dialog>
    </StyledBackgroundSection>
  );
};
