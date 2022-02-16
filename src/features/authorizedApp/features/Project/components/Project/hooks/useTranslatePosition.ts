import { selectors as sideMenuUiSelectors } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector } from "@/hooks/storeHooks";

export function useTranslatePosition() {
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);
  const sideMenuWidth = useAppSelector(sideMenuUiSelectors.selectWidth);

  return `translateX(${isSideMenuOpened ? sideMenuWidth / 2 : 0}px)`;
}
