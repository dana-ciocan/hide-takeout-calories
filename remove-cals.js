const removeCals = (parent = document, elementType = "p") => {
  const regex = /^[a-zA-Z .]*[0-9]* kcal[.]?[a-zA-Z .]*$/gi;
  const elements =
    typeof parent?.querySelectorAll === "function"
      ? parent.querySelectorAll(elementType)
      : [];
  const calorieElements = Array.from(elements).filter((element) =>
    regex.test(element.innerText)
  );
  calorieElements.forEach((element) => {
    element.style.background = "white";
    element.style.color = "white";
  });
};

removeCals(document, "span");
removeCals(document, "p");
removeCals(document, "div");

const calorieObserver = new MutationObserver(function (mutationRecord) {
  mutationRecord.forEach((mutation) => {
    mutation?.addedNodes &&
      Array.from(mutation?.addedNodes).length > 0 &&
      Array.from(mutation.addedNodes).forEach((element) => {
        setTimeout(removeCals(element, "span"), 0);
        setTimeout(removeCals(element, "p"), 0);
        setTimeout(removeCals(element, "div"), 0);
      });
  });
});

calorieObserver.observe(document.body, {
  subtree: true,
  childList: true,
});
