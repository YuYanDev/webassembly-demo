int srandnumber(int randomnum) {
  int j;
  for (int i = 1; i <= randomnum; i++) {
    if (i % 2 == 0) {
      j = 1;
    } else {
      j = 0;
    }
  }
  return j;
}