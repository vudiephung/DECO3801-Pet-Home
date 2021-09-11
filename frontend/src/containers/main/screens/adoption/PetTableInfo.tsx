import React from 'react';
import { DataTable } from 'react-native-paper';

function createData(field: string, value: string) {
  return { field, value };
}

const rows = [createData('Type', 'type'), createData('Age', 'age')];

export default function PetTable() {
  return (
    <DataTable>
      {rows.map((row) => (
        <DataTable.Row>
          <DataTable.Cell style={{ justifyContent: 'center' }}>{row.field}</DataTable.Cell>
          <DataTable.Cell style={{ justifyContent: 'center' }}>{row.value}</DataTable.Cell>
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
