import * as popupConfig from "./components/SideMenu/config";

type SwapSpacesWithUnderscores<T extends string> =
  T extends `${infer Start} ${infer End}`
    ? SwapSpacesWithUnderscores<`${Start}_${End}`>
    : T;

type PopupText =
  | typeof popupConfig.projectsPopupMenuItems[number]["text"]
  | typeof popupConfig.labelsPopupMenuItems[number]["text"]
  | typeof popupConfig.filtersPopupMenuItems[number]["text"];

type PopupAction =
  | SwapSpacesWithUnderscores<Uppercase<PopupText>>
  | SwapSpacesWithUnderscores<Uppercase<PopupText>>
  | SwapSpacesWithUnderscores<Uppercase<PopupText>>;

export type { PopupAction, PopupText };
