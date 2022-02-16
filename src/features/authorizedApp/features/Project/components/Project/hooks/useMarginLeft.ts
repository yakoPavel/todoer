import { selectors as sideMenuUiSelectors } from "@/features/authorizedApp/store/slices/sideMenuUi";
import { useAppSelector } from "@/hooks/storeHooks";

export function useMarginLeft() {
  const isSideMenuOpened = useAppSelector(sideMenuUiSelectors.selectIsOpened);
  const sideMenuWidth = useAppSelector(sideMenuUiSelectors.selectWidth);

  return isSideMenuOpened ? `${sideMenuWidth}px` : "unset";
}
