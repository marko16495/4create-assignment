export type TableColumns = RegularTableColumn[] | [CollapsableTableColumn]

interface RegularTableColumn {
  id: string;
  label?: string;
  width?: string;
  collapsable?: never;
  children?: never;
}

interface CollapsableTableColumn {
  id: string;
  label?: string;
  width?: string;
  collapsable: true;
  children: RegularTableColumn[];
  fixedHeightChildren: boolean;
}
