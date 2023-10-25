import styled from 'styled-components';

interface ExerciseImg {
  src: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  check: boolean;
}

const ExerciseImg = ({ src, title, check }: ExerciseImg) => {
  return (
    <ExerciseImgContainer check={check}>
      <ExerciseImage as={src} />
      <ExerciseName>{title}</ExerciseName>
    </ExerciseImgContainer>
  );
};

export default ExerciseImg;

const ExerciseImgContainer = styled.div<{ check: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.check ? 1 : 0.5)};
  &:hover {
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
`;

const ExerciseImage = styled.img`
  width: 100px;
  height: 120px;
  margin-bottom: 15px;
`;

const ExerciseName = styled.div``;
