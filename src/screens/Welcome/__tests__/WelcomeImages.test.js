import { createSnapshot } from '../../../util/tests';
import { CandidatesImage, GetInvolvedImage, StayInformedImage } from '../WelcomeImages';

describe('WelcomeImages', () => {
  it('CandidatesImage renders correctly', () => {
    const snapshot = createSnapshot(CandidatesImage);
    expect(snapshot).toMatchSnapshot();
  });

  it('StayInformedImage renders correctly', () => {
    const snapshot = createSnapshot(StayInformedImage);
    expect(snapshot).toMatchSnapshot();
  });

  it('GetInvolvedImage renders correctly', () => {
    const snapshot = createSnapshot(GetInvolvedImage);
    expect(snapshot).toMatchSnapshot();
  });
});
