export interface WaterTank {
  _id: string;
  waterLevel: number;
  referenceValue: number;
  inflow: number;
  outflow: number;
  createdAt: string;
  updatedAt: string;
}

export interface TableOptions {
  page: number;
  itemsPerPage: number;
}
