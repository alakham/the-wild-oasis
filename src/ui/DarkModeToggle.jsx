import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkmode } from "../contexts/DarkModeContext";

function DarkModeToggle() {
  const { handleDarkmode, darkMode } = useDarkmode();
  return (
    <ButtonIcon onClick={handleDarkmode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
