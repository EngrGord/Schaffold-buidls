import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

export default function ThemeSwitcher() {
  const theme = window.localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(!(!theme || theme === "light"));
  const { switcher, currentTheme, themes } = useThemeSwitcher();

  useEffect(() => {
    window.localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  const toggleTheme = isChecked => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  return (
    <div className="main fade-in" style={{ position: "fixed", right: 8, bottom: 8 }}>
      <Button aria-label="Toggle Color Mode" onClick={toggleTheme} _focus={{ boxShadow: "none" }} w="fit-content">
        {currentTheme === "light" ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
    </div>
  );
}
