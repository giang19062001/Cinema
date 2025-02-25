export function autoIncreaseCode(rows: any[], field: string, character: string) {
  if (rows?.length > 0) {
    let str = rows[0][field]
    let number = str.substring(3, str.length); // ENT001 => 001
    let suffix = number.replace(/^0+/, ''); // 001 => 1
    let newNumber = parseInt(suffix);
    newNumber++; // 1 => 2
    let prefix = str.substring(0, 3); // ENT001 => ENT
    let newSuffix = newNumber.toString().padStart(number.length, '0'); // 2 => 002
    return prefix + newSuffix; // ENT002
  } else {
    return character + "001"; // ENT001
  }
}
