import { FC, useEffect, useRef, useState } from "react";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";

type Props<T> = {
  items: T[];
  renderItem: (item: T, isActive: boolean, isBlur: boolean) => React.ReactNode;
  rotationInterval?: number;
  transitionDurationMs?: number;
};

export const BlurCarousel = <T,>({
  items,
  renderItem,
  rotationInterval = 7000,
  transitionDurationMs = 600,
}: Props<T>) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const prevIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  const goToIndex = (index: number) => setActiveIndex(index);
  const goNext = () => setActiveIndex((prev) => (prev + 1) % items.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + items.length) % items.length);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(goNext, rotationInterval);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [activeIndex, isHovered]);

  return (
    <Box
      {...swipeHandlers}
      sx={{ position: "relative", width: "100%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          overflow: "hidden",
          px: 2,
          transition: `transform ${transitionDurationMs}ms ease-in-out`,
        }}
      >
        {renderItem(items[prevIndex], false, true)}
        {renderItem(items[activeIndex], true, false)}
        {renderItem(items[nextIndex], false, true)}
      </Box>

      {/* Стрілки - винесені за межі карточок */}
      {!isMobile && (
        <>
          <IconButton
            onClick={goPrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: -100,
              transform: "translateY(-50%)",
              bgcolor: "#ffffffdd",
              "&:hover": { bgcolor: "#ffffff" },
              zIndex: 1,
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <IconButton
            onClick={goNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: -100,
              transform: "translateY(-50%)",
              bgcolor: "#ffffffdd",
              "&:hover": { bgcolor: "#ffffff" },
              zIndex: 1,
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </>
      )}

      <Box display="flex" justifyContent="center" mt={3}>
        {items.map((_, index) => (
          <IconButton
            key={index}
            size="small"
            onClick={() => goToIndex(index)}
            sx={{ color: index === activeIndex ? "#AC98D1" : "#D0C9E0" }}
          >
            <CircleIcon fontSize="inherit" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
};
