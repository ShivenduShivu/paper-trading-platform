const indicators = {};

export function registerIndicator(name, indicator) {
  indicators[name] = {
    instance: indicator,
    visible: false
  };
}

export function initIndicators(context) {
  Object.values(indicators).forEach(i => {
    if (i.instance.init) {
      i.instance.init(context);
    }
  });
}

export function updateIndicators(price, time, volume) {
  Object.values(indicators).forEach(i => {
    if (i.visible && i.instance.update) {
      i.instance.update(price, time, volume);
    }
  });
}

export function toggleIndicator(name, isVisible) {
  if (!indicators[name]) return;
  indicators[name].visible = isVisible;
  if (indicators[name].instance.setVisible) {
    indicators[name].instance.setVisible(isVisible);
  }
}
