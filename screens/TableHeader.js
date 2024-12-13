import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableHead = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>N</Text>
        <Text style={styles.headerText}>Ismi</Text>
        <Text style={styles.headerText}>Summa</Text>
        <Text style={styles.headerText}>Tahrirlash</Text>
        <Text style={styles.headerText}>O'chirish</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgb(57, 139, 147)",
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8, 
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14, 
  },
});

export default TableHead;
