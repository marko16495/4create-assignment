export type TableColumns = RegularTableColumn[];

interface RegularTableColumn {
  id: string;
  label?: string;
  width?: string;
  collapsable?: never;
  children?: never;
}
