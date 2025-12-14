export const state = {
  balance: 10000,
  position: null,
  price: 0
};

export function saveState() {
  localStorage.setItem("paper_state", JSON.stringify(state));
}

export function loadState() {
  const saved = localStorage.getItem("paper_state");
  if (saved) {
    const parsed = JSON.parse(saved);
    Object.assign(state, parsed);
  }
}
