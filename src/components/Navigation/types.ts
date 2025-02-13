export type NavItemType = {
  name: string;
  path: string;
  disabled?: boolean;
  items?: NavItemType[];
};
