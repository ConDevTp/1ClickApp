import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Chip, IconButton } from "@mui/material";
import { useState } from "react";
import { useStore } from "../../store/useStore";

const availableHeaders = ["Header-1", "Header-2", "Header-3", "Header-4"];

export const SectionWrapper = ({ sectionId, currentType, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const changeSectionType = useStore((s) => s.changeSectionType);

  const handleNext = () => {
    const currentIndex = availableHeaders.indexOf(currentType);
    const nextIndex = (currentIndex + 1) % availableHeaders.length;
    changeSectionType(sectionId, availableHeaders[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = availableHeaders.indexOf(currentType);
    const prevIndex =
      currentIndex === 0 ? availableHeaders.length - 1 : currentIndex - 1;
    changeSectionType(sectionId, availableHeaders[prevIndex]);
  };

  const isHeader = availableHeaders.includes(currentType);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: "2px solid #0d6efd",
          pointerEvents: "none",
          zIndex: 10,
        },
      }}
    >
      {isHovered && isHeader && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            boxShadow: 3,
            borderRadius: 2,
            p: 0.5,
          }}
        >
          <IconButton size="small" color="primary" onClick={handleNext}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
          <Chip
            label={currentType}
            size="small"
            color="primary"
            variant="outlined"
          />
          <IconButton size="small" color="primary" onClick={handlePrev}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {children}
    </Box>
  );
};
