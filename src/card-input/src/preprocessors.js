const countSpaces = (value, index) => {
  let counter = 0;

  for (let i = 0; i < Math.min(index, value.length); i+= 1) {
    if (value[i] === ' ') {
      counter += 1;
    }
  }

  return counter;
}

const calculateCaretIndex = (
  prevViewValue,
  viewValue,
  currentCaretIndex,
  isRemoving,
) => {
  const isSameValue = prevViewValue === viewValue;
  const isSpaceAdded = countSpaces(viewValue, currentCaretIndex) > countSpaces(prevViewValue, currentCaretIndex);
  const isPrevCharAnSpace = !isRemoving && viewValue.charAt(currentCaretIndex - 1) === ' ';

  if (isSameValue) {
    return currentCaretIndex - 1;
  }

  if (isSpaceAdded || isPrevCharAnSpace) {
    return currentCaretIndex + 1;
  }

  return Math.min(currentCaretIndex, viewValue.length);
};

export const preprocessCardNumber = (value, { currentCaretIndex, prevViewValue }) => {
  const isRemoving = value.length < prevViewValue.length;
  const cleanedValue = value.replace(/[\D\s]/g, '');
  const formattedValueArray = Array.from(cleanedValue);


  for (let i = 0; i < formattedValueArray.length; i += 5) {
    formattedValueArray.splice(i, 0, ' ');
  }

  const viewValue = formattedValueArray.join('').trim();

  if (isRemoving && (prevViewValue === viewValue)) {
    return preprocessCardNumber(
      viewValue.slice(0, currentCaretIndex - 1) + viewValue.slice(currentCaretIndex),
      { currentCaretIndex: currentCaretIndex - 1, prevViewValue },
    );
  }

  const caretIndex = calculateCaretIndex(prevViewValue, viewValue, currentCaretIndex, isRemoving);

  return { viewValue, caretIndex };
};
