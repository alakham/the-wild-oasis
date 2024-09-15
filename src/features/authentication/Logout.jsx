import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

function Logout() {
  const { logingOut, isLogingOut } = useLogout();
  return (
    <ButtonIcon onClick={() => logingOut()} disabled={isLogingOut}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
