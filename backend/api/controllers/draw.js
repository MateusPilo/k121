/* eslint-disable import/prefer-default-export */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */


function mix(peoples) {
  let currentIndex = peoples.length;
  let valueTemp;
  let random;

  // https://github.com/coolaj86/knuth-shuffle
  while (currentIndex !== 0) {
    random = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    valueTemp = peoples[currentIndex];
    peoples[currentIndex] = peoples[random];
    peoples[random] = valueTemp;
  }
  return peoples;
}

const toDraw = (peoples) => {
  let result = {};
  try {
    const mixedPeoples = mix(peoples.dados);
    const updatedPeoples = mixedPeoples.map((people, index) => {
      if (index === (mixedPeoples.length - 1)) {
        people.amigo = mixedPeoples[0].nome;
      } else {
        people.amigo = mixedPeoples[index + 1].nome;
      }
      return people;
    });
    result = { peoples: updatedPeoples };
    return result;
  } catch (error) {
    result = { success: false, error };
  }
  return result;
};

module.exports = toDraw;
