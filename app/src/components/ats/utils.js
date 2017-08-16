export function getCurrentStage(stage) {
  if(stage.Placement) {
    return 'Placement';
  } else if (stage.Offer) {
    return 'Offer';
  } else if (stage.CCM) {
    return 'CCM';
  } else if (stage.Submittal) {
    return 'Submittal';
  } else if (stage.Application) {
    return 'Application';
  }
}

export function getNextStage(stage) {
  if(stage.Offer) {
    return 'Placement';
  } else if (stage.CCM) {
    return 'Offer';
  } else if (stage.Submittal) {
    return 'CCM';
  } else if (stage.Application) {
    return 'Submittal';
  }
}