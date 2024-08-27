import React from 'react';
import { useDispatch } from 'react-redux';
import CustomButton from './CustomButton';
import { addStudyAid } from '../store/pagesSlice';
import { mcq, trueFalse, fillInTheGap, flashcard } from '../data/studyAids';

const StuddyAids = () => {
  const dispatch = useDispatch();

  const handleAddMCQ = () => {
    dispatch(addStudyAid(mcq));
  };

  const handleAddTrueFalse = () => {
    dispatch(addStudyAid(trueFalse));
  };

  const handleAddFillInTheGap = () => {
    dispatch(addStudyAid(fillInTheGap));
  };

  const handleAddFlashcard = () => {
    dispatch(addStudyAid(flashcard));
  };

  return (
    <>
      <CustomButton iconType="bx:bxs-card" buttonText="Flash Card" onClick={handleAddFlashcard} />
      <CustomButton iconType="bx:bxs-file" buttonText="Add MCQ" onClick={handleAddMCQ} />
      <CustomButton iconType="bx:bxs-check-square" buttonText="True False" onClick={handleAddTrueFalse} />
      <CustomButton iconType="bx:bxs-pencil" buttonText="Fill in the Gaps" onClick={handleAddFillInTheGap} />
    </>
  );
};

export default StuddyAids;