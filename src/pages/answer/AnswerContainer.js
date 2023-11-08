import * as S from '../post/PostStyle';

import { useState, useEffect } from 'react';
import ClipBoardCopyMessage from 'components/clipBoardCopyMessage';
import QuestionModal from 'components/questionModal';
import FeedCard from 'components/answerFeedCard/FeedCard.js';
import { getSubjectsOnQuestions } from '../../api/api.subjects.js';
import { deleteQuestion } from '../../api/api.questions';

import ShareIcon from 'assets/images/ShareIcon.svg';
import KAKAO from 'assets/images/ShareIcon_KAKAO.svg';
import FACEBOOK from 'assets/images/ShareIcon_FACEBOOK.svg';

export default function Answer() {
  const [questionList, setQusetionList] = useState([]);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleRenderSubjectsOnQ = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);

      setQusetionList(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickButton = () => {
    setOpenModal(!isOpenModal);
  };

  const handleAllDeleteQuestionList = async (id) => {
    try {
      const { results } = await getSubjectsOnQuestions(id);

      const questionIdForDelete = results.map((result) => result.id);

      questionIdForDelete.map(async (id) => {
        await deleteQuestion(id);
      });

      setQusetionList([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRenderSubjectsOnQ(143);
  }, []);

  return (
    <>
      {isOpenModal && <QuestionModal onClick={handleClickButton} />}
      <S.Wrapper>
        <S.Title>아초는 고양이</S.Title>
        <S.LinkContainer>
          <S.LinkIcon src={ShareIcon} alt="링크공유_아이콘"></S.LinkIcon>
          <S.LinkIcon src={KAKAO} alt="카카오링크_아이콘"></S.LinkIcon>
          <S.LinkIcon src={FACEBOOK} alt="페이스북링크_아이콘"></S.LinkIcon>
        </S.LinkContainer>

        <S.ButtonWrapper>
          <S.DeleteButton onClick={() => handleAllDeleteQuestionList(143)}>삭제하기</S.DeleteButton>
        </S.ButtonWrapper>
        <S.FeedContainer isEmpty={questionList}>
          <S.Info>
            <S.IconMessage />
            <S.QuestionCount>
              {questionList ? `${questionList.length}개의 질문이 있습니다` : `아직 질문이 없습니다`}
            </S.QuestionCount>
          </S.Info>
          {!questionList ? (
            <S.EmptyBoxImg />
          ) : (
            <>
              {questionList.map((question) => {
                return <FeedCard key={question.id} {...question} />;
              })}
            </>
          )}
        </S.FeedContainer>
        <S.CreateQuestionButton onClick={handleClickButton}>질문 작성하기</S.CreateQuestionButton>
        <ClipBoardCopyMessage />
      </S.Wrapper>
    </>
  );
}