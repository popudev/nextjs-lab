import ThemeRegistry from "@/theme/ThemeRegistry";
import { Box } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lab",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <ThemeRegistry>
        <body suppressHydrationWarning={true} className={inter.className}>
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.8)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </body>
      </ThemeRegistry>
    </html>
  );
}
