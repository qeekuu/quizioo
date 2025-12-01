// Wybierz JEDEN wariant bazy w zależności od środowiska/dev platformy.
// Najczęściej na Android Emulator: 10.0.2.2
const BASES = {
  androidEmulator: "http://10.0.2.2:4000",
  iosSimulator: "http://localhost:4000",
  deviceLAN: "http://10.214.134.210:4000", // <-- IP (wlo1)
  localtunnel: "https://xxxxx.loca.lt",
};

export const API_BASE = BASES.deviceLAN;
