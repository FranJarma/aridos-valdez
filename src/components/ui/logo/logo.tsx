import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";

const LOGO_ALT = "Fidelix Logo";
const LOGO_CONTAINER_HEIGHT = 64;
const LOGO_SRC = "/logo-fidelix.webp";
const LOGO_TRANSITION = "all 200ms ease-out";

type LogoProps = {
  alt?: string;
  collapsed?: boolean;
  height?: number;
  isCentered?: boolean;
  src?: string;
  sx?: SxProps<Theme>;
  transition?: string;
};

export function Logo({
  alt = LOGO_ALT,
  collapsed = false,
  height = collapsed ? 32 : 40,
  isCentered = false,
  src = LOGO_SRC,
  sx = {},
  transition = LOGO_TRANSITION,
}: LogoProps) {
  return (
    <Box
      sx={{
        height: LOGO_CONTAINER_HEIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: isCentered ? "center" : "flex-start",
        px: collapsed ? 1 : 2,
        borderBottom: "1px solid",
        borderColor: "divider",
        ...sx,
      }}
    >
      <img
        alt={alt}
        src={src}
        style={{
          height: height,
          width: "auto",
          objectFit: "contain",
          transition,
        }}
      />
    </Box>
  );
}
