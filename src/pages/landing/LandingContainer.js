import LogIn from 'components/Login';
import * as style from './LandingStyle';
import arrowRight from '../../assets/images/arrow-right.svg';

export default function LandingContainer() {
  return (
    <style.Container>
      <style.GoAskButton>
        질문하러가기
        <img src={arrowRight} alt="" />
      </style.GoAskButton>
      <style.Logo src="/images/logo.svg" alt="로고" />
      <LogIn></LogIn>
      <style.HeroImage></style.HeroImage>
    </style.Container>
  );
}
